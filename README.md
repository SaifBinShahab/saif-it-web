# Saif — Personal Portfolio

Open source version of the portfolio website.

Astro + React, dark-by-default with a light toggle, built around a modular
component system so sections, cards, tags, buttons, and forms can be reused
across pages with minimal effort.

## Setup

```bash
# Install packages and dependencies.
npm install

# Run the dev server. (Runs vite with hot loading).
npm run dev

# Build site.
npm run build
```

No `.env` file needed — the two pieces of "config" the site talks to externally (Web3Forms, YouTube) are both public identifiers, not secrets, so they live directly in `src/data/siteConfig.ts` (see below). If you'd still rather keep them out of source control for your own reasons, nothing stops you from wiring them to `import.meta.env` yourself — the components just read whatever `contact.web3formsAccessKey` / `youtube.channelId` resolve to.

## Where to edit things

- **Site copy, nav, socials, rotating hero roles, profile photo toggle, impact stats** → `src/data/siteConfig.ts`
- **Skills** → `src/data/skills.ts`
- **Blog posts** → `src/content/blog/*.mdx`
- **Projects, experience, achievements, works, testimonials** → `src/content/*/*.md` (each folder is a content collection with its own schema in `src/content/config.ts`)
- **Profile photo** → drop images in `public/images/`, then set `profilePhoto.light` / `profilePhoto.dark` in `siteConfig.ts`. Provide one, both, or neither — the geometric frame adapts either way (photo-less renders the ornament alone; one photo is used for both themes; two photos swap automatically with the theme toggle).
- **Logo** → set `brandAssets.logo.light` / `brandAssets.logo.dark` in `siteConfig.ts` to image paths (SVG recommended). Leave both blank to keep the default letter + wordmark. Swapping is instant and flash-free — both images render in the DOM and CSS shows the right one for the active theme.
- **Favicon** → set `brandAssets.favicon.light` / `brandAssets.favicon.dark` in `siteConfig.ts` (defaults to `public/favicon-light.svg` / `public/favicon-dark.svg`, which are placeholders — replace with your real mark). Unlike the logo/photo, the favicon is a `<link>` element that CSS can't target, so it's swapped by a tiny inline script that runs before first paint (initial load) and again on manual toggle.
- **Contact form (and the e-book order form)** → Web3Forms. Set `contact.web3formsAccessKey` in `siteConfig.ts`. Get a free key at [https://web3forms.com] — it's a public, client-exposed identifier by design (Web3Forms embeds it in the page on every one of their users' sites), so there's no security reason to hide it in `.env`.
- **YouTube videos** → set `youtube.channelId` in `siteConfig.ts` (must be the real `UC...` ID, not a @handle) to auto-pull your latest uploads via the public RSS feed — no API key, no `.env`. To take manual control instead, fill in `youtube.manualVideos`; those are used automatically if the live fetch returns nothing.

## Font sizes — one place controls everything

Every heading, paragraph, tag, and label on the site is sized with Tailwind's normal `text-xs` … `text-6xl` classes, same as always — but those classes no longer hold fixed numbers. They each read from a CSS variable defined once in `src/styles/global.css`:

```css
:root {
  --font-scale: 1;
  --fs-base: calc(1rem * var(--font-scale));
  --fs-4xl: calc(2.25rem * var(--font-scale));
  /* …xs, sm, lg, xl, 2xl, 3xl, 5xl, 6xl, same pattern */
}
```

Change any `--fs-*` value there and every heading/body/tag using that size updates site-wide — no component edits needed.

**Per-page override**, for cases like `ebook.astro` or an individual blog post wanting different sizing without touching the global values: every page goes through `<BaseLayout>`, which accepts a `fontScale` prop (default comes from `typography.baseFontScale` in `siteConfig.ts`, normally `1`). Passing e.g. `<BaseLayout fontScale={1.1}>` scales *every* `--fs-*` variable by 10% on that page only, by setting `--font-scale` on that page's `<html>` element.

For blog posts specifically, this is also exposed as an optional `fontScale` frontmatter field — set `fontScale: 1.1` in a post's frontmatter and that post alone renders larger, with zero code changes.

## Card sizing (bento-style grids)

Projects, Works, and Achievements/Certs cards each accept an optional `size` field in frontmatter: `"1x1"` (default), `"2x1"` (spans two columns), `"1x2"` (spans two rows), or `"2x2"` (both). This only applies at tablet width and up (`md:`) — mobile always stays single-column. Useful for making one standout project or cert visually bigger than the rest in its grid, bento-box style.

## Works & Projects

- **Works** now follows the same featured/showAll pattern as Blogs and Certs: mark an entry `featured: true` in frontmatter to show it on the homepage. The homepage section shows only featured entries plus a "Show All Works" button to `/works`, which reuses the identical `Works` component with `showAll`.
- **Works banners** — optional `banner: "/images/works/my-thing.webp"`, shown as the card thumbnail (same pattern as blog/cert images).
- **Projects** now use a single `projectUrl` field (repo or live link — whichever's more relevant) instead of the old separate `link`/`repo` fields; the whole card becomes clickable when set. Projects also accept an optional `banner` thumbnail, same as Works.

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
- `size` → same bento-grid sizing as Projects/Works, see "Card sizing" above.
