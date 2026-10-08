// Central, editable site configuration.
// Update names, roles, links, and copy here — components read from this file
// rather than hardcoding content, so most future edits happen in one place.

export const site = {
  name: "Saif",
  fullName: "Saif Bin Shahab",
  role: "Cybersecurity Specialist & Entrepreneur",
  tagline: "Student of knowledge, in dunya and deen.",
  description:
    "A humble seeker of knowledge stumbled upon 'Ilm, Cyber Security and IT; seeking only the pleasure of Allah.",
  url: "https://saif-it.pages.dev",
  locale: "en",
};

export const rotatingRoles = [
  "Cyber Security Specialist",
  "Software Developer",
  "Founder & Entrepreneur",
  "Taalib al-'Ilm",
];

export const nav = [
  { label: "Blogs", href: "/blogs" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = [
  { label: "YouTube", href: "https://youtube.com/@SaifBinShahab-141", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saif-bin-shahab", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/saifbinshahab", icon: "github" },
  { label: "X", href: "https://x.com/saifbinshahab", icon: "x" },
  { label: "Mastodon", href: "https://mastodon.social/@saifbinshahab", icon: "mastodon" },
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
  { label: "Years in tech", value: 9, suffix: "+" },
  { label: "Clients served", value: 5, suffix: "+" },
  { label: "Projects done", value: 25, suffix: "+" },
  { label: "Articles published", value: 34, suffix: "+" },
];

export const contact = {
  email: "saifbinshahab@proton.me"
};

export const youtube = {
  // Must be the real channel ID (starts with "UC...", 24 chars) — a @handle
  // or custom URL will not work with the RSS feed. Or set PUBLIC_YT_CHANNEL_ID in .env.
  channelId: "",
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
