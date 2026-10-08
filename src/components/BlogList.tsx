import { useEffect, useMemo, useState } from "react";

export type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  banner?: string;
  pubDateLabel: string;
  searchText: string; // lowercased title + description + tags + stripped body
};

// Interactive blog list: search box (title/description/tags/content) +
// clickable tag filter, both combined. Reads/writes ?tag= in the URL so
// tag links from the individual post page land here pre-filtered and the
// filtered view is shareable/bookmarkable.
export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    if (tag) setActiveTag(tag);
  }, []);

  function selectTag(tag: string | null) {
    setActiveTag(tag);
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set("tag", tag);
    else url.searchParams.delete("tag");
    window.history.replaceState({}, "", url);
  }

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      const matchesQuery = !q || p.searchText.includes(q);
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none";

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, tag, or content…"
          className={`${inputClass} md:max-w-sm`}
          aria-label="Search blog posts"
        />
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => selectTag(null)}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] ${
                !activeTag
                  ? "border-[var(--accent)] text-[var(--accent)] bg-[rgb(var(--accent-rgb)/0.12)]"
                  : "border-[var(--border)] text-[var(--text-muted)]"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectTag(tag === activeTag ? null : tag)}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] ${
                  tag === activeTag
                    ? "border-[var(--accent)] text-[var(--accent)] bg-[rgb(var(--accent-rgb)/0.12)]"
                    : "border-[var(--border)] text-[var(--text-muted)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-[var(--text-muted)]">
          No posts match{query ? ` "${query}"` : ""}
          {activeTag ? ` in "${activeTag}"` : ""}.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filtered.map((post) => (
            <a
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="hover-lift flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
            >
              {post.banner && (
                <div className="-mx-6 -mt-6 mb-4 aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={post.banner}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <p className="font-mono text-xs text-[var(--text-muted)]">{post.pubDateLabel}</p>
              <h3 className="mt-2 font-heading text-xl font-semibold leading-snug">{post.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {post.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {post.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-1 text-xs font-mono tracking-wide text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
