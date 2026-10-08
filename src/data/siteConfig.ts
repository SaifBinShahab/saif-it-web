// Central, editable site configuration.
// Update names, roles, links, and copy here — components read from this file
// rather than hardcoding content, so most future edits happen in one place.

export const site = {
  name: "Saif",
  fullName: "Saif Bin Sahab",
  role: "Cybersecurity Specialist & Taalib al-'Ilm",
  tagline: "Guard what's entrusted to you.",
  description:
    "Cybersecurity specialist and student of Islamic knowledge, writing at the intersection of digital security and deen — where guarding a network and guarding the heart follow the same discipline.",
  url: "https://saif.example.com", // TODO
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
  { label: "YouTube", href: "https://youtube.com/@yourhandle", icon: "youtube" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/yourhandle", icon: "github" },
  { label: "X", href: "https://x.com/yourhandle", icon: "x" },
];

// Optional profile photo. Leave `src` empty/undefined to render the
// geometric frame without an image — the Hero section adapts either way.
export const profilePhoto = {
  src: "/sign-light.png", // e.g. "/images/profile.jpg"
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
