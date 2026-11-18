# Sushmoy Datta: Portfolio

"Dark Spatial Editorial" portfolio built with React, TypeScript, Tailwind CSS v4 and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit content

All text lives in `src/data.ts` (it mirrors the Master Profile doc). Change it there and every section updates.
Your photo is `src/assets/portrait.jpg`.

## Structure

| File | What it is |
| --- | --- |
| `src/components/GridFrame.tsx` | Fixed 1px architectural grid framing the viewport |
| `src/components/Hero.tsx` | Kinetic serif headline, mono metadata tags, scroll-linked motion, stats |
| `src/components/Orb.tsx` | 3D glass orb with a rotating network mesh (canvas) and mouse parallax |
| `src/components/Marquee.tsx` | Scroll-velocity marquee that speeds up and reverses with scrolling |
| `src/components/Bento.tsx` | 12-column bento grid of frosted glass cards with 3D tilt and spring entrances |
| `src/components/ProjectArt.tsx` | Line drawing for each project |
| `src/components/ui.tsx` | Neo-brutalist glass buttons, tags, section frame |
| `src/components/Sections.tsx` | Nav, About, Experience, Skills, Credentials, Contact |

Motion respects the visitor's "reduce motion" setting.

## Deploy to GitHub Pages

1. Create a repo named `sushmoydatta.github.io` and push this folder.
2. Run `npm run build` and publish `dist/` (for example with the `peaceiris/actions-gh-pages` action, or Settings → Pages → GitHub Actions → "Static HTML" pointed at `dist`).
3. If you use a different repo name such as `portfolio`, set `base: "/portfolio/"` in `vite.config.ts`.

Netlify or Vercel also work: build command `npm run build`, output folder `dist`.
