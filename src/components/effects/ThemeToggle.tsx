import { useEffect, useState } from "react";
import { brandAssets } from "@/data/siteConfig";

// Same fallback logic as BaseLayout's inline script — keep in sync if you
// change how theme-aware assets resolve.
const faviconLight = brandAssets.favicon.light || brandAssets.favicon.dark || "/favicon.svg";
const faviconDark = brandAssets.favicon.dark || brandAssets.favicon.light || "/favicon.svg";

// Reads/writes data-theme on <html>. Paired with an inline no-FOUC script
// in BaseLayout that sets the initial theme (and favicon) before hydration.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    document
      .getElementById("favicon")
      ?.setAttribute("href", next === "light" ? faviconLight : faviconDark);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] ${className}`}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
