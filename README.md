# mycv – File Structure

```
mycv/
├── index.html              ← Shell page (nav + section containers)
├── css/
│   └── style.css           ← All styles, organised by component
├── js/
│   └── main.js             ← Loads section partials + nav behaviour
├── sections/
│   ├── about.html          ← About / hero section
│   ├── experience.html     ← Work experience timeline
│   ├── education.html      ← Education timeline
│   ├── skills.html         ← Skills grid
│   ├── research.html       ← Research papers / working papers
│   └── articles.html       ← Articles / press
└── assets/
    └── giulio-battista.png ← Profile photo (replace with your image)
```

## How it works

`index.html` is a lightweight shell. On page load, `main.js` fetches each
`sections/*.html` partial in parallel and injects it into the matching
`<div id="section-*">` container. The result is a seamless single-page CV —
same URL, same feel as the original — just split across maintainable files.

## How to fill in your content

Open each file in `sections/` and replace the placeholder text with your
real data. All files are plain HTML — no build step required.

| File | What to edit |
|---|---|
| `sections/about.html` | Name, bio, tagline, contact links |
| `sections/experience.html` | Duplicate `.timeline-item` blocks for each role |
| `sections/education.html` | Duplicate `.timeline-item` blocks for each degree |
| `sections/skills.html` | Add / remove `<li class="skill-item">` entries |
| `sections/research.html` | Duplicate `.research-item` blocks |
| `sections/articles.html` | Duplicate `.article-item` blocks |

## Profile photo

Place your photo at `assets/giulio-battista.png` (or update the `src`
attribute in `sections/about.html`).

## Hosting on GitHub Pages

Because `main.js` uses `fetch()` to load the partials, the site must be
served over HTTP/HTTPS — it will not work when opened directly as a local
file (`file://`). GitHub Pages handles this automatically.

If you want to preview locally, run a simple server:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## Customisation

All colours, fonts, and spacing are CSS custom properties at the top of
`css/style.css` — edit the `:root` block to restyle the entire site.
