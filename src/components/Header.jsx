import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Snowflake } from 'lucide-react';
import { useLang } from '../i18n/useLang.js';
import { LANGS } from '../i18n/content.js';

const SECTION_IDS = ['top', 'resume', 'work', 'engineering', 'contact'];

/** Tracks which section crosses the upper part of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function Header({ snow, onSnow, theme, onTheme }) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const listRef = useRef(null);
  const markerRef = useRef(null);
  const placed = useRef(false);

  // One marker slides to the current link, stretching a little on the way.
  const placeMarker = useCallback((animate) => {
    const list = listRef.current;
    const marker = markerRef.current;
    if (!list || !marker) return;
    const link = list.querySelector('[aria-current="location"]');
    if (!link) {
      marker.style.opacity = '0';
      return;
    }
    const first = !placed.current;
    placed.current = true;
    if (first) marker.style.transition = 'none';
    marker.style.height = `${link.offsetHeight}px`;
    marker.style.translate = `0 ${link.offsetTop}px`;
    marker.style.opacity = '1';
    if (first) {
      void marker.offsetHeight;
      marker.style.transition = '';
    } else if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      marker.animate([{ scale: '1 1' }, { scale: '1 1.9', offset: 0.35 }, { scale: '1 1' }], {
        duration: 520,
        easing: 'ease-out',
      });
    }
  }, []);

  useEffect(() => {
    placeMarker(true);
  }, [active, lang, placeMarker]);

  useEffect(() => {
    const onResize = () => placeMarker(false);
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [placeMarker]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      document.getElementById('menu-button')?.focus();
    }
  };

  return (
    <header className="site-header" data-open={open} onKeyDown={onKeyDown}>
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        <span className="brand__name">{t.brand.name}</span>
        <span className="brand__role">{t.brand.role}</span>
      </a>

      <div className="site-controls">
        <div className="lang" role="group" aria-label={t.ui.langLabel}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              aria-label={l.name}
              aria-pressed={lang === l.code}
              onClick={() => setLang(l.code)}
            >
              {l.short}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="icon-btn"
          aria-pressed={snow}
          aria-label={t.ui.snow}
          title={t.ui.snow}
          onClick={() => onSnow(!snow)}
        >
          <Snowflake width={18} height={18} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--theme"
          aria-pressed={theme === 'dark'}
          aria-label={t.ui.darkTheme}
          title={t.ui.darkTheme}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            onTheme(theme === 'dark' ? 'light' : 'dark', { x: r.left + r.width / 2, y: r.top + r.height / 2 });
          }}
        >
          <Moon width={18} height={18} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <button
          id="menu-button"
          type="button"
          className="menu-btn lg:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.ui.menuClose : t.ui.menuOpen}
        </button>
      </div>

      <nav id="site-nav" className="site-nav" aria-label={t.ui.navLabel}>
        <ul ref={listRef}>
          <span className="nav-marker" ref={markerRef} aria-hidden="true" />
          {t.nav.map((item, i) => (
            <li key={item.id} style={{ '--i': i }}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
