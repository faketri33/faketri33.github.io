import { flushSync } from 'react-dom';

/**
 * Runs a UI update inside a View Transition when the browser supports it
 * (cross-fade, or a circular reveal from `origin`). Falls back to a plain update,
 * and always does for people who asked for reduced motion.
 */
export function runTransition(update, origin) {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduced) {
    update();
    return;
  }
  if (origin) {
    root.style.setProperty('--vt-x', `${origin.x}px`);
    root.style.setProperty('--vt-y', `${origin.y}px`);
    root.dataset.vt = 'reveal';
  }
  const transition = document.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => {
    delete root.dataset.vt;
  });
}
