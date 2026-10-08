import { useEffect, useRef } from "react";

// Optional cursor-following glow. Disabled automatically on touch devices
// and under prefers-reduced-motion. Toggle its use by simply omitting the
// component from BaseLayout if you don't want it at all.
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    const el = dotRef.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }
    window.addEventListener("mousemove", onMove);

    function tick() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (el) el.style.transform = `translate3d(${x - 80}px, ${y - 80}px, 0)`;
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 h-40 w-40 rounded-full opacity-[0.25] blur-3xl"
      style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
    />
  );
}
