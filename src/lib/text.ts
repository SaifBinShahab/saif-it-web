// Strips common Markdown syntax down to plain, searchable text.
// Good enough for building a search index — doesn't need to be a full parser.
export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> link text
    .replace(/^#{1,6}\s+/gm, "") // heading markers
    .replace(/[*_~>#-]/g, " ") // emphasis/quote/list markers
    .replace(/\s+/g, " ")
    .trim();
}
