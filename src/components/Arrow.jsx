import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight } from 'lucide-react';

const ICONS = { ne: ArrowUpRight, e: ArrowRight, s: ArrowDown, n: ArrowUp };

/** Decorative arrow; the link text carries the meaning. */
export default function Arrow({ dir = 'ne', size = 16 }) {
  const Icon = ICONS[dir];
  return (
    <Icon
      className={`arrow${dir === 's' ? ' arrow--down' : ''}`}
      width={size}
      height={size}
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}
