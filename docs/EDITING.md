# How to edit the Potsdam Aquatics website

You do **not** need to touch code for normal updates. Edit the **YAML** files in the **`data`** folder on GitHub (or in Cursor), then **save** and **push** (or use GitHub’s “Commit changes”). The live site updates in about a minute.

## Files you might edit

| File | What it controls |
|------|------------------|
| **`data/site.yaml`** | Phone, email, Facebook link, address, map link, wish list form |
| **`data/hours.yaml`** | Normal week + special hours for specific dates |
| **`data/about.yaml`** | About section: title, paragraph, bullets, quote |
| **`data/gallery.yaml`** | Gallery title, intro, and each photo (link + caption) |

Lines starting with **`#`** are **comments** — they do not show on the website.

## Phone and address

Open **`data/site.yaml`**. Change `phoneDisplay` (what people see) and `phoneTel` (for taps to call — use `+1` and no spaces, e.g. `+13152219922`).

`addressLines` is a list; use `-` for each line.

## Hours

Open **`data/hours.yaml`**.

- **`byWeekday`**: keys **`"0"`** through **`"6"`** = **Sunday** through **Saturday**.
- **`dateOverrides`**: for **one day only**, add a date like **`"2026-12-25"`** under `dateOverrides:` with either:
  - `closed: true` and optional `note`, or
  - `hours: "10am–2pm"` and optional `note`.

Indent with **spaces** (two spaces is usual). YAML cares about indentation.

## Photos

In **`data/gallery.yaml`**, under `items:`, each photo has:

- **`src`** — web address of the image, or a path like `images/my-fish.jpg` if you uploaded a file to an **`images`** folder in the repo.
- **`alt`** — short description (helps accessibility).
- **`caption`** — label under the photo.

## Wish list form (email)

The site cannot send email by itself. Use a free **Formspree** form:

1. Sign up at [formspree.io](https://formspree.io).
2. Create a form and copy the URL (looks like `https://formspree.io/f/abcdefgh`).
3. Paste it into **`data/site.yaml`** as **`wishlistFormAction:`** (keep it in quotes if it has special characters).

Optional: set **`wishlistNextUrl`** to your site’s address plus **`?thanks=1`** so people see a thank-you message after sending.

## If something looks wrong

- Check that you did not delete a **`:`** or break indentation in YAML.
- Open the site in an **incognito/private** window after a few minutes (cache).
- If you use **Cursor** or another AI, point it at **`docs/AI-CONTEXT.md`** and **`AGENTS.md`**.

---

*If an AI or developer changes how the site works, they should update this file so these instructions stay accurate.*
