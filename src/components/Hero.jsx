import { useLang } from '../i18n/useLang.js';
import { GITHUB_URL } from '../data/projects.js';
import { FileDown } from 'lucide-react';
import Arrow from './Arrow.jsx';

export default function Hero() {
  const { t } = useLang();
  const { hero } = t;

  return (
    <section id="top" className="section section--hero hero" aria-labelledby="hero-title">
      <div className="page hero-grid">
        <div className="hero__main">
          <h1 id="hero-title">{hero.headline}</h1>
          <ul className="strengths">
            {hero.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="hero__intro">{hero.intro}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">
              {hero.ctaContact}
              <Arrow dir="s" />
            </a>
            <a className="btn btn--ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              {hero.ctaGithub}
              <span className="sr-only"> {t.ui.external}</span>
              <Arrow />
            </a>
            <button type="button" className="btn btn--text" onClick={() => window.print()}>
              <FileDown className="arrow" width={16} height={16} strokeWidth={1.75} aria-hidden="true" />
              {hero.ctaPdf}
            </button>
          </div>
        </div>

        <nav className="hero__index index" aria-labelledby="index-title">
          <p id="index-title" className="index__title">
            {hero.indexTitle}
          </p>
          <ul>
            {hero.index.map((row, i) => (
              <li key={row.href} style={{ '--i': i }}>
                <a href={row.href}>
                  <span className="index__label">{row.label}</span>
                  <span className="index__detail">{row.detail}</span>
                  <Arrow dir="e" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
