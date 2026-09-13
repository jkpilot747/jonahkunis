#!/usr/bin/env node
// Local-only gallery ordering tool — `npm run order`, then open the printed
// URL. Drag thumbnails to reorder a project's images, click ★ to set its
// cover, Save writes the new order straight into content/projects.json.
// Nothing here ships with the site: it's a tiny standalone node server that
// reads public/work/ for thumbnails and never touches app/.
//
// Order survives future `npm run images` runs — that script keeps whatever
// order is already in projects.json and only appends brand-new files.

import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJECTS_JSON_PATH = path.join(ROOT, "content", "projects.json");
const PUBLIC_WORK_DIR = path.join(ROOT, "public", "work");
const PORT = Number(process.env.PORT) || 3001;

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".mp4": "video/mp4" };

async function readProjects() {
  return JSON.parse(await readFile(PROJECTS_JSON_PATH, "utf-8"));
}

async function readBody(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return JSON.parse(body);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (req.method === "GET" && url.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(PAGE);
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/projects") {
      const projects = (await readProjects()).map((project) => ({
        slug: project.slug,
        title: project.title,
        layout: project.layout,
        cover: project.cover?.src,
        groups: project.groups,
        images: (project.images ?? []).map(({ src, w, h, caption, group, video }) => ({
          src, w, h, caption, group, video: Boolean(video),
        })),
      }));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(projects));
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/save") {
      const { slug, order, cover } = await readBody(req);
      const projects = await readProjects();
      const project = projects.find((entry) => entry.slug === slug);
      if (!project) throw new Error(`unknown slug ${slug}`);

      const bySrc = new Map(project.images.map((image) => [image.src, image]));
      const sameSet =
        order.length === project.images.length && order.every((src) => bySrc.has(src));
      if (!sameSet) {
        throw new Error("image list changed on disk since the page loaded — reload and redo");
      }

      project.images = order.map((src) => bySrc.get(src));
      if (cover && bySrc.has(cover)) {
        project.cover = { ...project.cover, src: cover };
      }

      await writeFile(PROJECTS_JSON_PATH, `${JSON.stringify(projects, null, 2)}\n`, "utf-8");
      console.log(`Saved ${slug}: ${order.length} images, cover ${project.cover.src}`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    if (req.method === "GET" && url.pathname.startsWith("/work/")) {
      const filePath = path.join(PUBLIC_WORK_DIR, decodeURIComponent(url.pathname.slice(6)));
      if (!filePath.startsWith(PUBLIC_WORK_DIR)) throw new Error("bad path");
      const data = await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": MIME[path.extname(filePath).toLowerCase()] ?? "application/octet-stream",
      });
      res.end(data);
      return;
    }

    res.writeHead(404);
    res.end("not found");
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Gallery order tool: http://localhost:${PORT}`);
  console.log("With `npm run dev` also running, each project's [View on site] link previews the real layout.");
});

const PAGE = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Gallery order</title>
<style>
  body { margin: 0; font: 14px/1.4 -apple-system, system-ui, sans-serif; color: #111; background: #fff; }
  header { position: sticky; top: 0; z-index: 2; background: #fff; border-bottom: 1px solid #ddd;
           padding: 12px 20px; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; }
  select, button { font: inherit; padding: 6px 10px; }
  button.save { background: #111; color: #fff; border: 0; cursor: pointer; }
  button.save:disabled { background: #999; cursor: default; }
  .status { color: #666; }
  .hint { color: #666; padding: 12px 20px 0; max-width: 900px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; padding: 16px 20px 60px; }
  .tile { position: relative; border: 2px solid transparent; background: #f4f4f2; cursor: grab; user-select: none; }
  .tile.dragging { opacity: .35; }
  .tile.over { border-color: #111; }
  .tile img { display: block; width: 100%; height: 170px; object-fit: contain; pointer-events: none; }
  .num { position: absolute; top: 4px; left: 4px; background: #111; color: #fff; font-weight: 600; padding: 1px 6px; }
  .badge { position: absolute; top: 4px; right: 34px; background: #fff; padding: 1px 5px; font-size: 11px; }
  .star { position: absolute; top: 2px; right: 4px; border: 0; background: none; font-size: 20px; cursor: pointer; color: #bbb; padding: 0; }
  .star.on { color: #e0a800; }
  .meta { font-size: 11px; color: #555; padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .group { font-size: 11px; font-weight: 600; padding: 0 6px 4px; }
  .warn { color: #b00; }
</style>
</head>
<body>
<header>
  <select id="project"></select>
  <button class="save" id="save" disabled>Save</button>
  <button id="revert">Revert</button>
  <a id="view" target="_blank">[View on site]</a>
  <span class="status" id="status"></span>
</header>
<p class="hint">Drag to reorder. ★ sets the cover. Galleries are 2 columns on desktop and fill
  <b>down the left column first</b>, then the right, so #1 is top-left and roughly the
  first half of the list ends up on the left. Videos break out full-width wherever they sit.</p>
<div class="grid" id="grid"></div>
<script>
let projects = [], current = null, order = [], cover = null, dirty = false, dragSrc = null;
const $ = (id) => document.getElementById(id);

async function load() {
  projects = await (await fetch("/api/projects")).json();
  $("project").innerHTML = projects.map(p => '<option value="' + p.slug + '">' + p.title + ' (' + p.images.length + ')</option>').join("");
  const last = location.hash.slice(1);
  select(projects.some(p => p.slug === last) ? last : projects[0].slug);
}

function select(slug) {
  if (dirty && !confirm("Discard unsaved changes?")) { $("project").value = current.slug; return; }
  current = projects.find(p => p.slug === slug);
  $("project").value = slug;
  location.hash = slug;
  order = current.images.map(i => i.src);
  cover = current.cover;
  $("view").href = "http://localhost:3000/work/" + slug;
  setDirty(false);
  render();
}

function setDirty(value) { dirty = value; $("save").disabled = !value; $("status").textContent = value ? "Unsaved changes" : ""; }

function groupLabel(key) {
  const g = current.groups && current.groups[key];
  return typeof g === "string" ? g : (g && g.text) || key;
}

function render() {
  const byImage = Object.fromEntries(current.images.map(i => [i.src, i]));
  // Flag a group that's been split into two runs: the site would render its label twice.
  const seen = new Set(); const split = new Set(); let prev;
  for (const src of order) { const g = byImage[src].group || ""; if (g !== prev) { if (g && seen.has(g)) split.add(g); seen.add(g); prev = g; } }
  $("grid").innerHTML = order.map((src, i) => {
    const img = byImage[src];
    const orient = img.w > img.h * 1.05 ? "wide" : img.h > img.w * 1.05 ? "tall" : "square";
    return '<div class="tile" draggable="true" data-src="' + encodeURIComponent(src) + '">' +
      '<img loading="lazy" src="/work/' + current.slug + '/' + encodeURIComponent(src) + '">' +
      '<span class="num">' + (i + 1) + '</span>' +
      (img.video ? '<span class="badge">▶ video</span>' : '<span class="badge">' + orient + '</span>') +
      '<button class="star' + (src === cover ? ' on' : '') + '" title="Set as cover">★</button>' +
      '<div class="meta">' + src + '</div>' +
      (img.group ? '<div class="group' + (split.has(img.group) ? ' warn' : '') + '">' + groupLabel(img.group) + (split.has(img.group) ? ' (split!)' : '') + '</div>' : '') +
      '</div>';
  }).join("");
}

$("grid").addEventListener("dragstart", e => { const t = e.target.closest(".tile"); if (!t) return; dragSrc = decodeURIComponent(t.dataset.src); t.classList.add("dragging"); });
$("grid").addEventListener("dragend", () => { document.querySelectorAll(".dragging,.over").forEach(el => el.classList.remove("dragging", "over")); });
$("grid").addEventListener("dragover", e => { const t = e.target.closest(".tile"); if (!t) return; e.preventDefault(); document.querySelectorAll(".over").forEach(el => el.classList.remove("over")); t.classList.add("over"); });
$("grid").addEventListener("drop", e => {
  const t = e.target.closest(".tile"); if (!t || !dragSrc) return; e.preventDefault();
  const target = decodeURIComponent(t.dataset.src); if (target === dragSrc) return;
  const from = order.indexOf(dragSrc), to = order.indexOf(target);
  order.splice(from, 1); order.splice(to, 0, dragSrc);
  dragSrc = null; setDirty(true); render();
});
$("grid").addEventListener("click", e => {
  if (!e.target.classList.contains("star")) return;
  cover = decodeURIComponent(e.target.closest(".tile").dataset.src); setDirty(true); render();
});
$("project").addEventListener("change", e => select(e.target.value));
$("revert").addEventListener("click", () => { dirty = false; select(current.slug); });
$("save").addEventListener("click", async () => {
  const res = await fetch("/api/save", { method: "POST", body: JSON.stringify({ slug: current.slug, order, cover }) });
  const out = await res.json();
  if (!res.ok) { $("status").textContent = "Save failed: " + out.error; return; }
  current.images = order.map(src => current.images.find(i => i.src === src));
  current.cover = cover;
  setDirty(false); $("status").textContent = "Saved";
});
window.addEventListener("beforeunload", e => { if (dirty) e.preventDefault(); });
load();
</script>
</body>
</html>`;
