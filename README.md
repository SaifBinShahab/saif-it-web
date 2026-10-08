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
- **Profile photo** → drop images in `public/images/`, then set `profilePhoto.light` / `profilePhoto.dark` in `siteConfig.ts`. Provide one, both, or neither — the geometric frame adapts either way (photo-less renders the ornament alone; one photo is used for both themes; two photos swap automatically with the theme toggle).
- **Logo** → set `brandAssets.logo.light` / `brandAssets.logo.dark` in `siteConfig.ts` to image paths (SVG recommended). Leave both blank to keep the default letter + wordmark. Swapping is instant and flash-free — both images render in the DOM and CSS shows the right one for the active theme.
- **Favicon** → set `brandAssets.favicon.light` / `brandAssets.favicon.dark` in `siteConfig.ts` (defaults to `public/favicon-light.svg` / `public/favicon-dark.svg`, which are placeholders — replace with your real mark). Unlike the logo/photo, the favicon is a `<link>` element that CSS can't target, so it's swapped by a tiny inline script that runs before first paint (initial load) and again on manual toggle.
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

## Blog: banner, search, tags, prev/next, code copy

- **Banner** → set `banner: "/images/blog/my-post.webp"` in a post's frontmatter. Shows as the card thumbnail (homepage + blog list) and as the full image at the top of the post.
- **Search** → the `/blogs` page is powered by `BlogList.tsx`, which searches title, description, tags, and the post's full markdown content (stripped to plain text at build time in `lib/text.ts`).
- **Clickable tags** → tags are clickable only on the `/blogs` list (the filter bar at the top) and on an individual post page (each tag links to `/blogs?tag=<tag>`, which pre-filters the list). Card tags in grids elsewhere are static.
- **Previous/Next** → shown at the bottom of each post, based on chronological order (oldest → newest). No extra frontmatter needed — it's computed from `pubDate`.
- **Code copy button** → added automatically to every fenced code block via `lib/codeCopy.ts`. No setup per post.

## Image lightbox

`Lightbox.tsx` is mounted once, globally, in `BaseLayout`. Anything with a `data-lightbox-src="..."` attribute opens it (used by Certs cards and blog banners), and so does every image inside blog post body content (`.prose img`) — no per-image setup needed for the latter, just use a normal `![alt](src)` in your markdown.

## Certs / Achievements

- `image` → thumbnail on the card, and the image shown in the lightbox when the card is clicked.
- `credentialUrl` → when set, shows a "View Credential" button (click doesn't trigger the lightbox).
- `order` → custom display order, ascending, same pattern as Projects/Experience/Works.
- `featured` → set `true` to show on the homepage. The homepage section always shows only featured entries, with a "View All Certs" button to `/certs`, which reuses the same section with `showAll`.
