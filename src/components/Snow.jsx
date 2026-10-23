import { useEffect, useRef } from 'react';

const SIZES = [1.2, 2, 3];

/** Pre-rendered flake sprites: one small bitmap per size and theme. */
function makeSprite(radius, dark) {
  const size = Math.ceil(radius * 2 + 4);
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const g = c.getContext('2d');
  g.beginPath();
  g.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
  g.fillStyle = dark ? 'rgba(235, 242, 255, 0.85)' : 'rgba(255, 255, 255, 0.95)';
  g.fill();
  if (!dark) {
    g.lineWidth = 1;
    g.strokeStyle = 'rgba(36, 89, 211, 0.3)';
    g.stroke();
  }
  return c;
}

// While the page scrolls, snow rests in place. If this device then drops frames
// (SLOW_LIMIT frames longer than SLOW_FRAME_MS), the layer is also hidden during scrolling.
const SLOW_FRAME_MS = 34;
const SLOW_LIMIT = 5;

/**
 * Light snowfall on a canvas behind the page. Motion is scaled by frame time so it
 * looks the same at any refresh rate; flakes are drawn from sprites at 1x resolution
 * to keep the fill cost low. Flakes drift, wrap around and are pushed away from the
 * pointer. Paused while the tab is hidden.
 */
export default function Snow() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    const sprites = { light: SIZES.map((r) => makeSprite(r, false)), dark: SIZES.map((r) => makeSprite(r, true)) };
    let w = 0;
    let h = 0;
    let flakes = [];
    let raf = 0;
    let last = 0;
    let scrolling = false;
    let idleTimer = 0;
    let sampleRaf = 0;
    let sampleLast = 0;
    let slowFrames = 0;
    let hideOnScroll = false;
    const pointer = { x: -1000, y: -1000 };

    const make = () => {
      const size = Math.floor(Math.random() * SIZES.length);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size,
        fall: 0.3 + Math.random() * 0.6 + size * 0.15,
        sway: 0.15 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        push: 0,
      };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      const count = Math.round(Math.min(55, (w * h) / 20000));
      flakes = Array.from({ length: count }, make);
    };

    const frame = (time) => {
      const step = last ? Math.min((time - last) / 16.67, 3) : 1;
      last = time;
      const set = document.documentElement.dataset.theme === 'dark' ? sprites.dark : sprites.light;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        const wind = Math.sin(time / 3500 + f.phase) * f.sway;
        const dx = f.x - pointer.x;
        const dy = f.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0) f.push += (dx / dist) * ((110 - dist) / 110) * 0.9 * step;
        f.push *= Math.pow(0.93, step);
        f.x += (wind + f.push) * step;
        f.y += f.fall * step;
        if (f.y > h + 4) {
          f.y = -4;
          f.x = Math.random() * w;
        }
        if (f.x > w + 4) f.x = -4;
        if (f.x < -4) f.x = w + 4;
        const sprite = set[f.size];
        ctx.drawImage(sprite, (f.x - sprite.width / 2) | 0, (f.y - sprite.height / 2) | 0);
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    const resume = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (!document.hidden && !scrolling) raf = requestAnimationFrame(frame);
    };
    // The page scrolls smoothly first: flakes rest while scrolling and fall again right after.
    const sample = (time) => {
      if (sampleLast && time - sampleLast > SLOW_FRAME_MS) slowFrames += 1;
      sampleLast = time;
      if (!hideOnScroll && slowFrames >= SLOW_LIMIT) {
        hideOnScroll = true;
        canvas.dataset.paused = '';
      }
      sampleRaf = requestAnimationFrame(sample);
    };
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        cancelAnimationFrame(raf);
        sampleLast = 0;
        if (hideOnScroll) canvas.dataset.paused = '';
        sampleRaf = requestAnimationFrame(sample);
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        scrolling = false;
        cancelAnimationFrame(sampleRaf);
        delete canvas.dataset.paused;
        resume();
      }, 140);
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(sampleRaf);
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}
