// Converts a "<cols>x<rows>" size token (see content/config.ts: cardSize)
// into the Tailwind grid-span classes that make a card take up more than
// one cell. Applied at md: and up only, so mobile always stays single-column.
export function cardSizeClasses(size: string | undefined): string {
  const [col, row] = (size ?? "1x1").split("x").map(Number);
  const classes: string[] = [];
  if (col >= 2) classes.push("md:col-span-2");
  if (row >= 2) classes.push("md:row-span-2");
  return classes.join(" ");
}
