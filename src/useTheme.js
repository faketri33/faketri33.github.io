import { useCallback, useEffect, useState } from 'react';
import { runTransition } from './viewTransition.js';

const KEY = 'theme';

function initialTheme() {
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage can be unavailable */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Light/dark theme: saved choice first, then the system preference. */
export function useTheme() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#14161A' : '#F6F5F1');
  }, [theme]);

  const set = useCallback((value, origin) => {
    runTransition(() => {
      document.documentElement.dataset.theme = value;
      setTheme(value);
    }, origin);
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
  }, []);

  return [theme, set];
}
