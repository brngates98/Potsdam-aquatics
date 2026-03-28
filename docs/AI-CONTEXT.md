# AI context — Potsdam Aquatics (GitHub Pages)

Use this file when helping maintain the site. Human-friendly steps live in **`docs/EDITING.md`**. Repo-wide agent rules: **`AGENTS.md`**.

## Architecture

- **Static site** — no server. Hosted on **GitHub Pages** from repo root (`index.html`).
- **Content** — four YAML files under **`data/`**, loaded at runtime by **`js/content.js`** via `fetch()`.
- **YAML parsing** — **`js/vendor/js-yaml.min.js`** (js-yaml 4.x) must load **before** `content.js` (see `index.html`). Global: **`jsyaml.load`**.

## Data files (authoritative)

| Path | Purpose |
|------|---------|
| `data/site.yaml` | Business meta, social, contact, address, `mapsUrl`, wishlist Formspree `wishlistFormAction`, optional `wishlistNextUrl` |
| `data/hours.yaml` | `timezoneNote`, `byWeekday` keys `"0"`–`"6"` (Sun–Sat), `dateOverrides` map `YYYY-MM-DD` → `{ closed?, hours?, note? }` |
| `data/about.yaml` | `title`, `intro`, `bullets` (array), `quote`, `quoteAttribution` |
| `data/gallery.yaml` | `title`, `intro`, `items[]` with `src`, `alt`, `caption` |

### `content.js` contract

- **`applySite`**: sets `meta[name=description]`, all `a[data-link="facebook"]`, `#visit-lead`, `#visit-address-body`, `a[data-link="maps"]`, `a[data-link="phone"]`, `a[data-link="email"]`, `[data-link="facebook-text"]`, wishlist form action / `_subject` / `_next`, `?thanks=1` banner.
- **`applyHours`**: `#today-hours-*`, `#week-hours-body`; normalizes null `dateOverrides` to `{}`.
- **`applyAbout`**: `#about-title`, `#about-intro`, `#about-bullets`, `#about-quote`, `#about-cite`.
- **`applyGallery`**: `#gallery-title`, `#gallery-intro`, `#gallery-grid` (rebuilds figures).

### DOM hooks in `index.html`

- Error banner: `#content-load-error` (failed fetch or missing jsyaml).
- Wishlist: `#wishlist-form`, `#wishlist-config-note`, `#wishlist-thanks`.

## Maintenance rule for AI

When you change **schemas**, **file names**, **loader behavior**, or **anything a maintainer must do differently**, update:

1. **`docs/EDITING.md`** — kid/owner steps and tables.
2. **`docs/AI-CONTEXT.md`** — this technical reference.
3. **`AGENTS.md`** — if the high-level agent workflow changes.

---

Last updated: 2026-03-28 (YAML data + vendored js-yaml + docs).
