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
//
// Video files (.mp4/.mov/.m4v) are also picked up from raw/<slug>/: ffmpeg
// extracts a poster frame (run through the same sharp/blur path as a still)
// and transcodes the clip to a size-capped, web-friendly mp4. This requires
// ffmpeg on PATH — `brew install ffmpeg` — but that's only checked lazily,
// the first time a video file is actually encountered, so image-only runs
// are unaffected on a machine without it installed.

import { readdir, mkdir, readFile, writeFile, stat, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";
import exifr from "exifr";

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "raw");
const PUBLIC_WORK_DIR = path.join(ROOT, "public", "work");
const PROJECTS_JSON_PATH = path.join(ROOT, "content", "projects.json");

const LONG_EDGE = 2400;
const QUALITY = 90;
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
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".m4v"]);
const ALL_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS]);
const VIDEO_MAX_WIDTH = 1920;
const POSTER_TIMESTAMP = "00:00:00.5";

let ffmpegChecked = false;
async function ensureFfmpeg() {
  if (ffmpegChecked) return;
  try {
    await execFileAsync("ffmpeg", ["-version"]);
    ffmpegChecked = true;
  } catch {
    throw new Error(
      "ffmpeg not found on PATH — required to process video files. Install it (`brew install ffmpeg`) and try again.",
    );
  }
}

async function getVideoDuration(inputPath) {
  try {
    const { stdout } = await execFileAsync("ffprobe", [
      "-v", "error",
      "-show_entries", "format=duration",
      "-of", "default=noprint_wrappers=1:nokey=1",
      inputPath,
    ]);
    const seconds = Number.parseFloat(stdout.trim());
    return Number.isFinite(seconds) ? Math.round(seconds) : undefined;
  } catch {
    return undefined;
  }
}

// Extracts a poster frame and a web-optimized mp4 from a raw video file.
// The poster frame is run through processImage() below exactly like a still
// so it gets the same resize/blur-placeholder treatment as every other
// image on the site.
async function processVideo(inputPath, outputVideoPath, outputPosterPath) {
  await ensureFfmpeg();

  const tempPosterPath = `${outputPosterPath}.source.jpg`;
  await execFileAsync("ffmpeg", [
    "-y",
    "-ss", POSTER_TIMESTAMP,
    "-i", inputPath,
    "-frames:v", "1",
    "-q:v", "2",
    tempPosterPath,
  ]);

  const { width, height, blurDataURL } = await processImage(
    tempPosterPath,
    outputPosterPath,
  );
  await rm(tempPosterPath, { force: true });

  await execFileAsync("ffmpeg", [
    "-y",
    "-i", inputPath,
    "-vf", `scale='min(${VIDEO_MAX_WIDTH},iw)':-2`,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "23",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    outputVideoPath,
  ]);

  const duration = await getVideoDuration(inputPath);

  return { width, height, blurDataURL, duration };
}

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
      ALL_EXTENSIONS.has(path.extname(file).toLowerCase()),
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
      const isVideo = VIDEO_EXTENSIONS.has(path.extname(file).toLowerCase());
      const outName = `${path.parse(file).name}.jpg`;
      const outputPath = path.join(outDir, outName);

      try {
        const { size } = await stat(inputPath);
        if (size < SUSPICIOUSLY_SMALL_BYTES) {
          throw new Error(
            `file is only ${size} bytes — likely an un-downloaded iCloud placeholder, not the real image`,
          );
        }

        const existing = existingBySrc.get(outName) ?? existingBySrc.get(file);

        let width, height, blurDataURL, video;

        if (isVideo) {
          const videoOutName = `${path.parse(file).name}.mp4`;
          const videoOutputPath = path.join(outDir, videoOutName);
          const result = await processVideo(inputPath, videoOutputPath, outputPath);
          ({ width, height, blurDataURL } = result);
          video = {
            src: `/work/${project.slug}/${videoOutName}`,
            ...(result.duration ? { duration: result.duration } : {}),
          };
        } else {
          ({ width, height, blurDataURL } = await processImage(inputPath, outputPath));
        }

        newImages.push({
          src: outName,
          w: width,
          h: height,
          blur: blurDataURL,
          caption: existing?.caption ?? "",
          ...(existing?.group ? { group: existing.group } : {}),
          ...(video ? { video } : {}),
        });

        console.log(
          `  ${project.slug}/${outName} — ${width}x${height}${isVideo ? " (video)" : ""}`,
        );
      } catch (error) {
        failures.push(`${project.slug}/${file}: ${error.message}`);
        console.error(`  FAILED ${project.slug}/${file} — ${error.message}`);
      }
    }

    if (newImages.length === 0) {
      console.warn(`Skipping ${project.slug} — every image in raw/${project.slug}/ failed.`);
      continue;
    }

    // A hand-picked cover (set by editing content/projects.json directly)
    // is preserved across reruns as long as its image still exists — this
    // script only ever picks a *default* cover, for a brand-new project or
    // one whose previous cover image was removed from raw/. A video is
    // never eligible as that default; covers are always a still.
    const coverStillExists = newImages.some((image) => image.src === previousCoverSrc);
    const defaultCover = newImages.find((image) => !image.video) ?? newImages[0];

    if (previousCoverSrc && !coverStillExists) {
      console.warn(
        `  ${project.slug}: previous cover ${previousCoverSrc} no longer in raw/, switching to ${defaultCover.src}`,
      );
    }

    project.cover = {
      src: coverStillExists ? previousCoverSrc : defaultCover.src,
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
