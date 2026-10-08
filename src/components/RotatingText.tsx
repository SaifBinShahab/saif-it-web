import { useEffect, useState } from "react";

// Cycles through the given phrases with a soft fade/slide transition.
// Purely presentational island — used in the Hero headline.
export default function RotatingText({
  phrases,
  interval = 2600,
  className = "",
}: {
  phrases: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, reduceMotion ? 0 : 250);
    }, interval);
    return () => clearInterval(id);
  }, [phrases, interval]);

  return (
    <span
      className={`block transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${className}`}
    >
      {phrases[index]}
    </span>
  );
}
