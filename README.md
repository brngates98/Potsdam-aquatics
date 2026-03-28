# Potsdam Aquatics — website

Public site for **Potsdam Aquatics** (Potsdam, NY), deployed with **GitHub Pages**.

## For the person updating hours or photos

Read **[docs/EDITING.md](docs/EDITING.md)**. Almost everything is in the **`data/`** folder as **YAML** (text with `#` comments).

## For developers and AI assistants

- **[AGENTS.md](AGENTS.md)** — what to update when you change the project.
- **[docs/AI-CONTEXT.md](docs/AI-CONTEXT.md)** — schemas, files, and DOM hooks.

## Run locally

Static files only. From this folder:

```bash
npx --yes serve .
```

Then open the URL it prints (do not rely on `file://` — `fetch` needs a local server).

## Tech

HTML, CSS, vanilla JS; content in **`data/*.yaml`**; YAML parsed in-browser with **`js/lib/js-yaml.min.js`**.
