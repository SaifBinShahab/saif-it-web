import { defineCollection, z } from "astro:content";

// Shared by projects/works/achievements cards: "<cols>x<rows>" grid span,
// e.g. "2x1" spans two columns, "1x2" spans two rows, "2x2" spans both.
// Applied at the md: breakpoint and up — mobile always stays single-column.
const cardSize = z.enum(["1x1", "2x1", "1x2", "2x2"]).default("1x1");

const blog = defineCollection({
  type: "content", // .mdx
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    pillar: z.enum(["cybersecurity", "islamic-knowledge", "intersection", "personal"]),
    language: z.enum(["en", "bn"]).default("en"),
    tags: z.array(z.string()).default([]),
    banner: z.string().optional(), // e.g. "/images/blog/my-post.webp" — thumbnail on cards, full image on the post
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    fontScale: z.number().optional(), // override this post's text size only, see siteConfig.ts
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    problem: z.string(),
    solution: z.string().optional(),
    outcome: z.string(),
    tags: z.array(z.string()).default([]),
    projectUrl: z.string().url().optional(), // repo or live link — card becomes clickable when set
    banner: z.string().optional(), // e.g. "/images/projects/my-project.webp" — thumbnail on the card
    size: cardSize,
    order: z.number().default(0),
  }),
});

const experience = defineCollection({
  type: "content",
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    // String, not coerce.date(): keep whatever granularity you write.
    // "2023" -> year only. "2023-06" or a full date -> year + month shown.
    startDate: z.string(),
    endDate: z.string().optional(), // omit for "Present"
    // Optional one-line lead-in. The full write-up (bullets, code, whatever)
    // goes in the markdown body below the frontmatter and renders in full.
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const achievements = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.coerce.date(),
    credentialUrl: z.string().url().optional(), // shows a "View Credential" button when set
    image: z.string().optional(), // thumbnail shown on the card + full image in the lightbox
    tags: z.array(z.string()).default([]),
    size: cardSize,
    order: z.number().default(0), // custom display order, ascending
    featured: z.boolean().default(false), // shown on homepage when true
  }),
});

const works = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    kind: z.enum(["ebook", "software", "course", "other"]),
    description: z.string(),
    cta: z.object({
      label: z.string(),
      href: z.string(), // internal path (e.g. "/ebook") or an external URL
    }),
    price: z.string().optional(), // e.g. "Free", "$9", "৳299"
    banner: z.string().optional(), // e.g. "/images/works/my-ebook.webp" — thumbnail on the card
    tags: z.array(z.string()).default([]),
    size: cardSize,
    order: z.number().default(0),
    featured: z.boolean().default(false), // shown on homepage when true
  }),
});

const testimonials = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    title: z.string().optional(), // role / company
    quote: z.string(),
    avatar: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, projects, experience, achievements, works, testimonials };
