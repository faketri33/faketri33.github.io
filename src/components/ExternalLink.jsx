import { useLang } from '../i18n/useLang.js';
import Arrow from './Arrow.jsx';

/** Opens in a new tab and says so to assistive technology. */
export default function ExternalLink({ href, className = 'link', children }) {
  const { t } = useLang();
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {t.ui.external}</span>
      <Arrow />
    </a>
  );
}
