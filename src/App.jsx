import { useEffect, useRef } from 'react';
import { LangProvider } from './i18n/LangProvider.jsx';
import { useLang } from './i18n/useLang.js';
import { useSnowPref } from './useSnowPref.js';
import { useTheme } from './useTheme.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Engineering from './components/Engineering.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Snow from './components/Snow.jsx';
import Drift from './components/Drift.jsx';
import ToTop from './components/ToTop.jsx';

function Page() {
  const { t, lang, setLang } = useLang();
  const [snow, setSnow] = useSnowPref();
  const [theme, setTheme] = useTheme();
  const progressRef = useRef(null);

  // Deep links such as /#jsupervisor: the content renders after the browser
  // tried to jump to the anchor, so scroll once on mount.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  // Reveal blocks as they enter the viewport (CSS skips the effect for reduced motion).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.04 },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keyboard shortcuts (layout-independent): D theme, S snow, L language.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const el = e.target;
      if (el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return;
      if (e.code === 'KeyD') setTheme(theme === 'dark' ? 'light' : 'dark');
      else if (e.code === 'KeyS') setSnow(!snow);
      else if (e.code === 'KeyL') setLang(lang === 'en' ? 'ru' : 'en');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [theme, setTheme, snow, setSnow, lang, setLang]);

  // Reading progress, drawn as a thin line at the top edge.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${value.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#content">
        {t.ui.skip}
      </a>
      <div className="progress" ref={progressRef} aria-hidden="true" />
      {snow && <Snow />}
      <Header snow={snow} onSnow={setSnow} theme={theme} onTheme={setTheme} />
      <main id="content" className="site-main" tabIndex={-1}>
        <Hero />
        <Resume />
        <Work />
        <Engineering />
        <Contact />
        <Drift />
      </main>
      <ToTop />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
