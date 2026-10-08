import { defineCollection, z } from "astro:content";

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
    link: z.string().url().optional(),
    repo: z.string().url().optional(),
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
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
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
