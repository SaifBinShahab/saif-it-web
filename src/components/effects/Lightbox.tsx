import { useEffect, useState } from "react";

// Global floating image viewer, mounted once in BaseLayout. Opens whenever
// the user clicks:
//  - any element carrying a `data-lightbox-src` attribute (e.g. a Certs card)
//  - any <img> inside `.prose` content (blog post body images)
// A single delegated click listener covers both, so no per-page wiring is
// needed — drop `data-lightbox-src` on anything new and it works.
export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-lightbox-src], .prose img"
      );
      if (!target) return;
      const imgSrc =
        target.getAttribute("data-lightbox-src") || (target as HTMLImageElement).src;
      if (!imgSrc) return;
      e.preventDefault();
      setSrc(imgSrc);
      setCaption(
        target.getAttribute("data-lightbox-caption") || (target as HTMLImageElement).alt || ""
      );
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSrc(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = src ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [src]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-up"
      style={{ animationDuration: "0.2s" }}
      onClick={() => setSrc(null)}
      role="dialog"
      aria-modal="true"
      aria-label={caption || "Image viewer"}
    >
      {/* Glass-blur bordered frame */}
      <div
        className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-2 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setSrc(null)}
          aria-label="Close image viewer"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <img src={src} alt={caption} className="max-h-[80vh] w-auto rounded-xl object-contain" />
        {caption && <p className="mt-2 px-2 pb-1 text-center text-sm text-white/80">{caption}</p>}
      </div>
    </div>
  );
}
