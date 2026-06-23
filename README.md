# Rory Weldon - Portfolio Website

A multi-page personal portfolio built with hand-written HTML, Bootstrap 5, and a small amount of vanilla JavaScript.

Every significant structural choice is recorded as an Architecture Decision Record (ADR) under [`decisions/`](decisions/).

---

## Design Philosophy

The site tries to serve two audiences at once:

- **Recruiters**, who want something fast to skim and easy to digest.
- **Engineers**, who want the opposing depth and the reasoning behind the work.

Rather than compromise on one, the site layers content: the homepage and nav stay lean, while detailed project write-ups, the design story, and the decision records sit a click deeper. This tension and its resolution are documented in [ADR-0001](decisions/0001-progressive-disclosure.md).

---

## Tech Stack

| Layer            | Choice                                             | Rationale                                                                                 |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Markup           | Hand-written HTML5                                 | Avoid black boxes; learn the fundamentals ([ADR-0002](decisions/0002-HTML-first.md))      |
| Styling / Layout | [Bootstrap 5.3.8](https://getbootstrap.com/) (CDN) | Speed under deadline ([ADR-0004](decisions/0004-Adopt-Bootstrap.md), supersedes ADR-0002) |
| Custom theming   | `style.css` (CSS custom properties)                | Dark theme palette + custom components, loaded after Bootstrap to override                |
| Interactivity    | Vanilla JS (`scripts.js`)                          | Injects shared nav and footer; no framework                                               |
| Fonts            | JetBrains Mono (Google Fonts)                      | Wordmark / brand styling                                                                  |

No build step, no package manager, no framework. Open `index.html` in a browser (or serve the folder) and it runs.

---

## Site Structure

The information architecture is captured in [`docs/site-structure.md`](docs/site-structure.md):

```
Nav (lean, 3): Home · Projects · About

Home ──── ML teaser (Portent) ─────┐
     ──── Planner teaser (Seelf) ──┤
     ──── Creative teaser ─────────┤
                                   ↓ (click through to)
Projects (index)
   ├── Portent detail page  (the v1→v2→v3 rigor story — strongest content)
   └── Seelf detail page    (design docs only)

Creative Endeavors (own page)  ← reached from Home teaser + footer, no nav slot

About  — bio, photo, resume.pdf download   (transcripts: on request only)

Footer (every page): email · LinkedIn · GitHub
```

A **multi-page structure** was chosen over a single long page or a hybrid, to keep the homepage clean while still allowing depth on inner pages ([ADR-0003](decisions/0003-site-mapping.md)).

---

## File Layout

```
.
├── index.html                  # Home — three project teaser cards
├── projects.html               # Projects index (full catalog)
├── about.html                  # Bio + resume download
├── PortentHome.html            # Detail: ML stock-prediction system
├── SeelfHome.html              # Detail: student planner
├── CreativeEndeavorsHome.html  # Detail: worldbuilding, novels, TTRPG
├── template.HTML               # Base page for stamping new pages
│
├── nav.html                    # Shared nav, injected at runtime
├── footer.html                 # Shared footer, injected at runtime
├── scripts.js                  # Fetches + injects nav and footer
├── style.css                   # Theme palette + custom components
│
├── decisions/                  # Architecture Decision Records (ADRs)
│   ├── 0001-progressive-disclosure.md
│   ├── 0002-HTML-first.md       (superseded by 0004)
│   ├── 0003-site-mapping.md
│   ├── 0004-Adopt-Bootstrap.md
│   └── template.md
│
└── docs/
    ├── site-structure.md       # Information architecture map
    └── Rory_Weldon_Resume.pdf  # Linked from About
```

---

## Shared Components

The nav bar and footer are kept in standalone files (`nav.html`, `footer.html`) and injected into every page at runtime by `scripts.js`:

```js
async function loadNav() {
  const response = await fetch("nav.html");
  document.getElementById("nav-placeholder").innerHTML = await response.text();
}
```

This keeps the markup DRY across pages without a templating engine. Each page just drops in `<div id="nav-placeholder"></div>` and `<div id="footer-placeholder"></div>` placeholders.

> **Note:** because nav/footer are loaded via `fetch()`, the site must be served over HTTP rather than opened directly from the filesystem (`file://`), since browsers block `fetch` on local-file origins. Any static server works (see below).

---

## Theming

`style.css` defines the palette once as CSS custom properties on `:root`, then references them everywhere:

```css
:root {
  --color-bg: #16161a; /* charcoal base */
  --color-surface: #1f1f26; /* cards / boxes */
  --color-text: #e4e4e7; /* body text */
  --color-blue: #4cc9f0; /* primary accent */
  --color-purple: #a855f7; /* secondary accent */
}
```

Change a value here and it updates site-wide. The stylesheet also includes Bootstrap overrides (dark cards and buttons) plus two custom components used on the Portent page: the layered architecture diagram (`.arch-diagram`) and the v1→v2→v3 timeline (`.timeline`).

---

## Running Locally

Because of the runtime `fetch` for nav/footer, serve the folder rather than opening files directly:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve
```

Then visit `http://localhost:8000`.

---

## Architecture Decision Records

The `decisions/` folder is the reasoning trail behind the build. Each ADR follows the standard _Context → Decision → Alternatives Considered → Consequences_ format ([template](decisions/template.md)):

- **[ADR-0001](decisions/0001-progressive-disclosure.md)** — Progressive Disclosure _(accepted)_
- **[ADR-0002](decisions/0002-HTML-first.md)** — HTML First _(superseded by 0004)_
- **[ADR-0003](decisions/0003-site-mapping.md)** — Site Mapping / multi-page structure _(accepted)_
- **[ADR-0004](decisions/0004-Adopt-Bootstrap.md)** — Adopt Bootstrap _(accepted, supersedes 0002)_

---

## Contact

- **Email:** lweldon2@students.kennesaw.edu
- **LinkedIn:** [rory-weldon](https://www.linkedin.com/in/rory-weldon-5829ab297/)
- **GitHub:** [Art3misF0wl90](https://github.com/Art3misF0wl90)
