// Central, editable site configuration.
// Update names, roles, links, and copy here — components read from this file
// rather than hardcoding content, so most future edits happen in one place.

export const site = {
  name: "Saif",
  fullName: "Saif Bin Shahab",
  role: "Cybersecurity Specialist & Taalib al-'Ilm",
  tagline: "Guard what's entrusted to you.",
  description:
    "A humble seeker of knowledge stumbled upon 'Ilm, Cyber Security and IT; seeking only the pleasure of Allah.",
  url: "https://saif-it.pages.dev",
  locale: "en",
};

// Base font-size scale, applied site-wide. The actual per-size values
// (xs, sm, base, lg…6xl) live in src/styles/global.css as CSS variables —
// this is just the multiplier. 1 = 100% (default). To scale a single page
// (e.g. ebook.astro) instead of the whole site, pass fontScale to that
// page's <BaseLayout> (or set it in a blog post's frontmatter) rather than
// changing this value.
export const typography = {
  baseFontScale: 1,
};

export const rotatingRoles = [
  "Founder & Entrepreneur",
  "Cyber Security Specialist",
  "Software Developer",
  "Taalib al-'Ilm",
];

export const nav = [
  { label: "Blogs", href: "/blogs" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = [
  { label: "YouTube", href: "https://youtube.com/@yourhandle", icon: "youtube" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/yourhandle", icon: "github" },
  { label: "X", href: "https://x.com/yourhandle", icon: "x" },
  { label: "Mastodon", href: "https://mastodon.social/@yourhandle", icon: "mastodon" },
];

// Theme-aware brand assets. For each, provide a light-theme and a
// dark-theme file (SVG or raster). You can leave one or both blank:
//  - blank both -> components fall back to their built-in default look
//    (text wordmark for the logo, plain color favicon, ornament-only
//    frame for the profile photo)
//  - only one filled -> that single asset is used for both themes
//  - both filled -> the correct one swaps in automatically with the
//    theme toggle, no page reload, no flash
export const brandAssets = {
  logo: {
    light: "", // e.g. "/images/logo-light.svg" — shown on the light theme
    dark: "", // e.g. "/images/logo-dark.svg" — shown on the dark theme
  },
  favicon: {
    light: "/favicon-light.svg", // shown on the light theme
    dark: "/favicon-dark.svg", // shown on the dark theme
  },
};

// Optional profile photo, per theme. Leave both blank to render the
// geometric frame without a photo — the Hero section adapts either way.
export const profilePhoto = {
  light: "", // e.g. "/images/profile-light.jpg"
  dark: "", // e.g. "/images/profile-dark.jpg"
  alt: "Saif",
};

export const impactStats = [
  { label: "Years in cybersecurity", value: 5, suffix: "+" },
  { label: "Clients secured", value: 20, suffix: "+" },
  { label: "Homelab uptime", value: 99, suffix: "%" },
  { label: "Articles published", value: 30, suffix: "+" },
];

export const contact = {
  email: "hello@saif.example.com", // TODO
  // Web3Forms access key. This is a public, client-exposed identifier (not
  // a secret) — Web3Forms itself expects it embedded in the page, so it's
  // safe to commit here rather than keeping it in .env. Get a free one at
  // https://web3forms.com.
  web3formsAccessKey: "Touch_Some_Grass",
};

export const youtube = {
  // Must be the real channel ID (starts with "UC...", 24 chars) — a @handle
  // or custom URL will not work with the RSS feed. This is public info,
  // same as the key above — no .env needed.
  channelId: "UCCEE8e1Lcwmuhpqy1EqRBlg",
  maxVideos: 3,
  manualVideos: [
    // {
    //   id: "dQw4w9WgXcQ",
    //   title: "Example: Zero Trust, Explained Like an Amanah",
    //   publishedAt: "2026-08-01",
    //   thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    // },
  ] as { id: string; title: string; publishedAt: string; thumbnail: string }[],
};
