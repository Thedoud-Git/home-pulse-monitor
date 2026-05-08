// FIX #1 — vanilla replacement for the paid GSAP SplitText plugin.
// Wraps each word in nested spans so children can be transformed independently.
export function splitWords(el: HTMLElement | null): NodeListOf<HTMLElement> | [] {
  if (!el) return [];
  const text = el.textContent ?? '';
  el.innerHTML = text
    .split(' ')
    .map(
      (w) =>
        `<span class="inline-block overflow-hidden align-baseline"><span class="inline-block translate-y-full will-change-transform">${w}</span></span>`,
    )
    .join(' ');
  return el.querySelectorAll<HTMLElement>('span > span');
}
