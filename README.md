# Montreal NACIVT 2026 — Project Overview

Short README to share with teammates. Contains project layout, how to run locally, and pointers to main files.

**Project Layout**

- **Public & Config**
  - `index.html` — app entry HTML
  - `vite.config.js`, `package.json`, `eslint.config.js`

- **src/** — application source
  - `main.jsx` — app entry; sets up `react-router-dom` routes and `Layout`
  - `App.jsx` — homepage component (renders `Home`, `Hero`, sections)
  - `Layout.jsx` — layout wrapper that renders `Navbar`, `Outlet`, and `Footer`
  - `index.css`, `App.css` — global and app styles
  - `assets/` — images and static media (e.g., `montreal-skyline.jpg`)
  - `data/links.js` — central LINK constants for routes and contact
  - `components/`
    - `Navbar.jsx` — top navigation (uses `LINKS` and `react-router-dom` `Link`)
    - `Footer.jsx` — footer with quick links (uses `Link`)
  - `pages/` — route pages
    - `register/`, `tournament/`, `festival/`, `about/`, `rules/`, `location/` — each contains a simple page component (`*.jsx`)

**Routing**
- The app uses `react-router-dom` (v6). Routes are defined in `src/main.jsx` with a `Layout` route.
- `App.jsx` is used as the index (`/`) route — it remains the homepage component.
- `src/data/links.js` maps named keys to paths (e.g., `register: '/register'`, `home: '/'`). Use `LINKS` in components for consistent routes.

**Run locally**

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```
3. create new branch evrytime:
```bash
git checkout -b feature/...
```

Notes:
- Vite may pick a different port if `5173` is occupied — check the terminal output for the correct `Local` URL (e.g. `http://localhost:5175`).
- To force port 5173, find and stop the process using it: `lsof -i :5173` then `kill -9 <PID>`.

**Key developer notes**
- Navbar and Footer are componentized in `src/components/` and import `LINKS` from `src/data/links.js`.
- The Register button in the hero uses React Router's `Link` to `LINKS.register`.
- If you add pages, create a folder under `src/pages/` and export a default component; add the route in `src/main.jsx` (under the existing `Layout` route).

**Helpful files**
- `src/components/Navbar.jsx` — navigation items and logo link
- `src/components/Footer.jsx` — quick links and contact
- `src/data/links.js` — single place to update named routes and contact
- `src/App.jsx` — homepage layout and sections

