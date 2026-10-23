import { useCallback, useEffect, useMemo, useState } from 'react';
import { LangContext } from './LangContext.js';
import { runTransition } from '../viewTransition.js';
import { DEFAULT_LANG, DICT } from './content.js';

const STORAGE_KEY = 'lang';
const isSupported = (code) => Object.prototype.hasOwnProperty.call(DICT, code);

/** Priority: ?lang= in the URL, then the saved choice, then the browser language. */
function detectLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isSupported(fromUrl)) return fromUrl;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isSupported(saved)) return saved;
  } catch {
    /* storage can be unavailable; fall through */
  }
  return window.navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : DEFAULT_LANG;
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  // Keep <html lang>, the title and the meta description in sync with the UI language.
  useEffect(() => {
    const { meta } = DICT[lang];
    document.documentElement.lang = lang;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!isSupported(next)) return;
    runTransition(() => setLangState(next));
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(null, '', url);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: DICT[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
