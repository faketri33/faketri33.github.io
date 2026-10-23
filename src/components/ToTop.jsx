import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLang } from '../i18n/useLang.js';

/** Appears after the first screen; scrolls back to the top. */
export default function ToTop() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShow(window.scrollY > window.innerHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className="to-top"
      data-show={show}
      aria-label={t.ui.toTop}
      title={t.ui.toTop}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <ArrowUp width={18} height={18} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
