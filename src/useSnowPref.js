import { useCallback, useState } from 'react';

const KEY = 'snow';

/** Snowfall preference: saved choice first, otherwise off for people who asked for reduced motion. */
export function useSnowPref() {
  const [on, setOn] = useState(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === 'on' || saved === 'off') return saved === 'on';
    } catch {
      /* storage can be unavailable */
    }
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const set = useCallback((value) => {
    setOn(value);
    try {
      window.localStorage.setItem(KEY, value ? 'on' : 'off');
    } catch {
      /* ignore */
    }
  }, []);

  return [on, set];
}
