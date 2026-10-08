# Saif — Personal Portfolio

Astro + React, dark-by-default with a light toggle, built around a modular
component system so sections, cards, tags, buttons, and forms can be reused
across pages with minimal effort.

## Setup

```bash
npm install
cp .env.example .env   # fill in your Web3Forms key and YouTube channel ID
npm run dev
```

## Where to edit things

- **Site copy, nav, socials, rotating hero roles, profile photo toggle, impact stats** → `src/data/siteConfig.ts`
- **Skills** → `src/data/skills.ts`
- **Blog posts** → `src/content/blog/*.mdx`
- **Projects, experience, achievements, works, testimonials** → `src/content/*/*.md` (each folder is a content collection with its own schema in `src/content/config.ts`)
- **Profile photo** → drop an image in `public/images/`, then set `profilePhoto.src` in `siteConfig.ts`. Leave it blank and the geometric frame renders on its own — nothing breaks either way.
- **Contact form endpoint** → Web3Forms, wired via `PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env`. Get a free key at https://web3forms.com.
- **YouTube videos** → set `PUBLIC_YT_CHANNEL_ID` in `.env` (or `youtube.channelId` in `siteConfig.ts`) to auto-pull your latest uploads via the public RSS feed (no API key). To take manual control instead, fill in `youtube.manualVideos` in `siteConfig.ts` — those are used automatically if the live fetch returns nothing.

## Modularity notes

- Every homepage section (`src/components/sections/*.astro`) is a standalone component. Drop `<Works />` or `<Contact />` into any new page and it works identically — see `src/pages/works/index.astro` and `src/pages/contact.astro` for the pattern.
- Reorder the funnel by reordering the imports/tags in `src/pages/index.astro` — nothing else needs to change.
- `Button`, `Tag`, `Card`, `Container`, `SectionHeading` (`src/components/ui/`) are the shared primitives every section builds on. Change a hover effect or a border radius once, and it updates everywhere.
- `ContactForm.tsx` takes an `accessKey` prop and nothing else is page-specific — reuse it on any future page.
- Theme tokens live as CSS variables in `src/styles/global.css` (`:root` = light, `[data-theme="dark"]` = dark). Add a new color once there and it's available everywhere via `var(--name)`.

## New pages

To add a new page (e.g. a services page): create `src/pages/your-page.astro`, wrap content in `<BaseLayout>`, and compose it from existing sections/`ui` primitives. Nav links live in `src/data/siteConfig.ts`.

## Background field & cursor glow

`BackgroundField.tsx` (canvas constellation animation) and `CursorGlow.tsx`
are mounted once in `BaseLayout.astro`. Both respect `prefers-reduced-motion`
and `CursorGlow` auto-disables on touch devices. To turn either off globally,
remove the component from `BaseLayout.astro`; to turn off per-page, pass
`showBackgroundField={false}` / `showCursorGlow={false}` to `<BaseLayout>`.

## Deploying

Static output (`npm run build` → `dist/`). Works on Cloudflare Pages, Netlify,
Vercel, or any static host — no server runtime required.
