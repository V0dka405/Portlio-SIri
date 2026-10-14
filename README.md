# Siriwut Saleephan — Portfolio

Single-page portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**.
Static export, TH/EN, dark mode by default.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site -> ./out
npm run typecheck
```

## Where to edit content (no UI changes needed)

| What | File |
| --- | --- |
| Name, email, GitHub/LinkedIn, CV path, photo, site URL | `data/profile.ts` |
| Projects (text TH/EN, tags, links, media) | `data/projects.ts` |
| Skills groups | `data/skills.ts` |
| Experience & education | `data/experience.ts` |
| All UI text (nav, buttons, About text) in TH/EN | `data/i18n.ts` |
| Colors | `app/globals.css` (CSS variables) |

## Assets

- CV: replace `public/cv.pdf`
- Profile photo: add `public/profile.jpg`, set `photo: '/profile.jpg'` in `data/profile.ts`
- Project media: add files to `public/projects/` and set `media.src` in `data/projects.ts`
- Favicon: `app/icon.svg` · OG image: `app/opengraph-image.tsx` (generated at build)

## Deploy to Vercel

1. Push this folder to its own GitHub repo (the folder itself is the repo root).
2. On vercel.com: **Add New → Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected). Keep default build settings.
4. (Recommended) Add env var `NEXT_PUBLIC_SITE_URL` = your final URL, e.g. `https://yourname.vercel.app`.
5. Click **Deploy**. Every push to `main` redeploys automatically.
