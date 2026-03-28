# Agent instructions — Potsdam Aquatics site

This repo is a **static GitHub Pages** site: `index.html`, `css/styles.css`, `js/main.js` (mobile menu), `js/content.js` (loads data), and **`data/*.yaml`** (editable content).

## When you change the project

After edits to **data files**, **`js/content.js`**, **layout in `index.html`**, or **behavior/CSS** that a human maintainer should know about:

1. Update **`docs/EDITING.md`** if the kid-facing steps or field names change.
2. Update **`docs/AI-CONTEXT.md`** if schemas, file names, or architecture change (and bump the **Last updated** line at the bottom).

Do not leave documentation stale after substantive changes.

## Data format

- Content lives in **`data/site.yaml`**, **`data/hours.yaml`**, **`data/about.yaml`**, **`data/gallery.yaml`** (YAML with `#` comments).
- The browser parses YAML using **`js/lib/js-yaml.min.js`** (vendored; do not remove). It loads **without** `defer` so `window.jsyaml` exists before `content.js` runs.
- **Do not reintroduce JSON** as the primary format unless you migrate docs and `content.js` together.

## Longer reference

See **`docs/AI-CONTEXT.md`** for schemas, IDs, and conventions.
