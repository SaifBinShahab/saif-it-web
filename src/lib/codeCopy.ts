// Adds a "Copy" button to every fenced code block rendered inside `.prose`
// content. Astro's built-in Shiki highlighting outputs plain <pre><code>
// blocks with no interactivity, so this runs client-side after the page
// loads and wires one up per block. Safe to call more than once — already
//-processed blocks are skipped.
export function initCodeCopy() {
  const blocks = document.querySelectorAll<HTMLPreElement>(
    ".prose pre:not([data-copy-ready])"
  );

  blocks.forEach((pre) => {
    pre.setAttribute("data-copy-ready", "true");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-btn";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code to clipboard");

    button.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.innerText ?? pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied!";
        button.classList.add("is-copied");
      } catch {
        button.textContent = "Failed";
      }
      setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("is-copied");
      }, 1800);
    });

    pre.appendChild(button);
  });
}
