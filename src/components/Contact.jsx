import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useLang } from '../i18n/useLang.js';
import Arrow from './Arrow.jsx';

function CopyButton({ value }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard can be blocked; the address stays selectable and clickable */
    }
  };

  return (
    <>
      <button type="button" className="copy-btn" onClick={copy} aria-label={t.ui.copyLabel(value)}>
        {copied && <Check className="copy-check" width={14} height={14} strokeWidth={2.25} aria-hidden="true" />}
        {copied ? t.ui.copied : t.ui.copy}
      </button>
      <span className="sr-only" role="status">
        {copied ? t.ui.copied : ''}
      </span>
    </>
  );
}

export default function Contact() {
  const { t } = useLang();
  const { contact } = t;

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="page">
        <header className="section-head" data-reveal>
          <h2 id="contact-title">{contact.title}</h2>
          <p>{contact.lead}</p>
        </header>

        <ul className="contact-list" data-reveal>
          {contact.rows.map((row) => (
            <li key={row.value}>
              <span className="contact-list__label">{row.label}</span>
              <span className="contact-list__value">
                <a
                  className="link"
                  href={row.href}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {row.value}
                  {row.external && (
                    <>
                      <span className="sr-only"> {t.ui.external}</span>
                      <Arrow />
                    </>
                  )}
                </a>
              </span>
              {row.copy ? <CopyButton value={row.value} /> : <span className="contact-list__spacer" />}
            </li>
          ))}
        </ul>

        <footer className="site-footer">
          <span>© {new Date().getFullYear()} {t.brand.name}</span>
          <span className="site-footer__keys">
            {t.ui.shortcutsLabel}:{' '}
            {t.ui.shortcuts.map(([key, label]) => (
              <span key={key} className="site-footer__key">
                <kbd>{key}</kbd> {label}
              </span>
            ))}
          </span>
          <span>{contact.footer}</span>
        </footer>
      </div>
    </section>
  );
}
