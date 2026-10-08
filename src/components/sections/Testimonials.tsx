import { useEffect, useState } from "react";

export type Testimonial = { name: string; title?: string; quote: string };

// Auto-rotating quote carousel with manual prev/next controls.
const TRANSITION_MS = 350;

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  function goTo(next: number) {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIndex(next);
      return;
    }
    setVisible(false);
    setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, TRANSITION_MS);
  }

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => goTo((index + 1) % items.length), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length]);

  if (items.length === 0) return null;
  const current = items[index];

  function prev() {
    goTo((index - 1 + items.length) % items.length);
  }
  function next() {
    goTo((index + 1) % items.length);
  }

  return (
    <div className="mx-auto max-w-2xl text-center" data-reveal>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mx-auto mb-6 text-[var(--accent)]" aria-hidden="true">
        <path
          d="M7 9c-2 0-3.5 1.6-3.5 4S5 17 7 17c1.2 0 2-1 2-2.2 0-1-.7-1.8-1.7-1.8-.3 0-.6.1-.8.2.1-1.4 1.2-2.6 2.5-3V9Zm9 0c-2 0-3.5 1.6-3.5 4s1.5 4 3.5 4c1.2 0 2-1 2-2.2 0-1-.7-1.8-1.7-1.8-.3 0-.6.1-.8.2.1-1.4 1.2-2.6 2.5-3V9Z"
          fill="currentColor"
        />
      </svg>

      <div
        className="transition-all ease-out"
        style={{
          transitionDuration: `${TRANSITION_MS}ms`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <p className="font-heading text-xl leading-relaxed md:text-2xl">"{current.quote}"</p>
        <p className="mt-6 font-mono text-sm text-[var(--text-muted)]">
          {current.name}
          {current.title ? ` — ${current.title}` : ""}
        </p>
      </div>

      {items.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 w-4 rounded-full transition-colors ${
                  i === index ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
