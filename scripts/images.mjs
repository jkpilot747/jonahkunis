#!/usr/bin/env node
// Image pipeline — see docs/design-brief.md, "Content model" and build order
// step 6. Reads curated full-size exports from raw/<slug>/, writes resized
// copies to public/work/<slug>/, and regenerates content/projects.json.
//
// raw/ is gitignored and is NOT a mirror of the full photo archive — only
// the frames actually going on the site belong there. See the project's own
// notes on iCloud "Optimize Mac Storage" stub files before populating it:
// evicted files look like normal files in Finder but are tiny placeholder
// stubs on disk, and sharp will fail or hang trying to read them. Right-click
// the source folder in Finder and "Download Now" before copying anything in.

import { readdir, mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import exifr from "exifr";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "raw");
const PUBLIC_WORK_DIR = path.join(ROOT, "public", "work");
const PROJECTS_JSON_PATH = path.join(ROOT, "content", "projects.json");

const LONG_EDGE = 2400;
const QUALITY = 80;
const BLUR_WIDTH = 24;
const SUSPICIOUSLY_SMALL_BYTES = 10 * 1024;
const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

// Photos are ordered oldest-to-newest by EXIF capture date. Files with no
// readable capture date (screenshots, heavily re-exported files, scans)
// fall back to filename order at the end of the list — see the warning
// logged for them below, in keeping with this script's habit of surfacing
// anything that silently changes ordering or covers.
async function getCaptureDate(filePath) {
  try {
    const data = await exifr.parse(filePath, ["DateTimeOriginal", "CreateDate"]);
    const date = data?.DateTimeOriginal ?? data?.CreateDate;
    return date instanceof Date && !Number.isNaN(date.valueOf()) ? date : null;
  } catch {
    return null;
  }
}

async function sortByCaptureDate(dir, files) {
  const withDates = await Promise.all(
    files.map(async (file) => ({
      file,
      date: await getCaptureDate(path.join(dir, file)),
    })),
  );

  withDates.sort((a, b) => {
    if (a.date && b.date) return a.date - b.date;
    if (a.date) return -1;
    if (b.date) return 1;
    return a.file.localeCompare(b.file);
  });

  return {
    files: withDates.map((entry) => entry.file),
    undated: withDates.filter((entry) => !entry.date).map((entry) => entry.file),
  };
}

async function processImage(inputPath, outputPath) {
  const info = await sharp(inputPath)
    .rotate() // bake in EXIF orientation before it gets stripped below
    .resize({
      width: LONG_EDGE,
      height: LONG_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: QUALITY }) // no withMetadata() — this also strips EXIF
    .toFile(outputPath);

  const blurBuffer = await sharp(inputPath)
    .rotate()
    .resize(BLUR_WIDTH)
    .jpeg({ quality: 40 })
    .toBuffer();

  return {
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/jpeg;base64,${blurBuffer.toString("base64")}`,
  };
}

async function main() {
  if (!(await exists(RAW_DIR))) {
    console.error(`No raw/ folder at ${RAW_DIR} — nothing to process.`);
    process.exit(1);
  }

  const projects = JSON.parse(await readFile(PROJECTS_JSON_PATH, "utf-8"));
  const knownSlugs = new Set(projects.map((project) => project.slug));

  const rawEntries = await readdir(RAW_DIR, { withFileTypes: true });
  for (const entry of rawEntries) {
    if (entry.isDirectory() && !knownSlugs.has(entry.name)) {
      console.warn(
        `Skipping raw/${entry.name}/ — no matching slug in content/projects.json. Add the project by hand first.`,
      );
    }
  }

  const failures = [];

  for (const project of projects) {
    const projectRawDir = path.join(RAW_DIR, project.slug);
    if (!(await exists(projectRawDir))) {
      console.warn(`Skipping ${project.slug} — no raw/${project.slug}/ folder.`);
      continue;
    }

    const candidateFiles = (await readdir(projectRawDir)).filter((file) =>
      IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()),
    );

    if (candidateFiles.length === 0) {
      console.warn(`Skipping ${project.slug} — raw/${project.slug}/ has no images.`);
      continue;
    }

    const { files, undated } = await sortByCaptureDate(
      projectRawDir,
      candidateFiles,
    );

    if (undated.length > 0) {
      console.warn(
        `  ${project.slug}: ${undated.length} image(s) missing capture date, sorted by filename at the end — ${undated.join(", ")}`,
      );
    }

    // raw/ is a curation folder, not a permanent mirror (see header comment),
    // so images legitimately come and go as files are added to or removed
    // from raw/<slug>/ between runs — that's expected. But this script walks
    // every project's raw/ folder on every run, so a removal made for one
    // project's sake is easy to lose track of when it's really a side effect
    // showing up under a different project you weren't paying attention to.
    // Log it loudly instead of letting it pass silently.
    const existingImages = project.images ?? [];
    const previousCoverSrc = project.cover?.src;
    const newOutNames = new Set(
      files.map((file) => `${path.parse(file).name}.jpg`),
    );
    const removed = existingImages
      .map((image) => image.src)
      .filter((src) => !newOutNames.has(src));

    if (removed.length > 0) {
      console.warn(
        `  ${project.slug}: removing ${removed.length} image(s) no longer in raw/ — ${removed.join(", ")}`,
      );
    }

    const outDir = path.join(PUBLIC_WORK_DIR, project.slug);
    await mkdir(outDir, { recursive: true });

    const existingBySrc = new Map(
      existingImages.map((image) => [image.src, image]),
    );

    const newImages = [];

    for (const file of files) {
      const inputPath = path.join(projectRawDir, file);
      const outName = `${path.parse(file).name}.jpg`;
      const outputPath = path.join(outDir, outName);

      try {
        const { size } = await stat(inputPath);
        if (size < SUSPICIOUSLY_SMALL_BYTES) {
          throw new Error(
            `file is only ${size} bytes — likely an un-downloaded iCloud placeholder, not the real image`,
          );
        }

        const { width, height, blurDataURL } = await processImage(
          inputPath,
          outputPath,
        );

        const existing = existingBySrc.get(outName) ?? existingBySrc.get(file);

        newImages.push({
          src: outName,
          w: width,
          h: height,
          blur: blurDataURL,
          caption: existing?.caption ?? "",
          ...(existing?.group ? { group: existing.group } : {}),
        });

        console.log(`  ${project.slug}/${outName} — ${width}x${height}`);
      } catch (error) {
        failures.push(`${project.slug}/${file}: ${error.message}`);
        console.error(`  FAILED ${project.slug}/${file} — ${error.message}`);
      }
    }

    if (newImages.length === 0) {
      console.warn(`Skipping ${project.slug} — every image in raw/${project.slug}/ failed.`);
      continue;
    }

    if (previousCoverSrc && previousCoverSrc !== newImages[0].src) {
      console.warn(
        `  ${project.slug}: cover changed ${previousCoverSrc} -> ${newImages[0].src}`,
      );
    }

    project.cover = {
      src: newImages[0].src,
      ...(project.cover?.focal ? { focal: project.cover.focal } : {}),
    };
    project.images = newImages;
  }

  await writeFile(
    PROJECTS_JSON_PATH,
    `${JSON.stringify(projects, null, 2)}\n`,
    "utf-8",
  );
  console.log(`\nWrote ${PROJECTS_JSON_PATH}`);

  if (failures.length > 0) {
    console.error(`\n${failures.length} image(s) failed:`);
    for (const failure of failures) {
      console.error(`  ${failure}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
