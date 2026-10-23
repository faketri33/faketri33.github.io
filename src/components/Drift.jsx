/** A static snowdrift that closes the page. */
export default function Drift() {
  return (
    <svg className="drift" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className="drift__back" d="M0 50 C150 20 280 70 430 46 C580 22 700 68 860 44 C1000 24 1100 52 1200 36 V90 H0Z" />
      <path className="drift__front" d="M0 68 C170 44 300 84 470 64 C640 44 760 82 930 62 C1050 48 1130 70 1200 58 V90 H0Z" />
    </svg>
  );
}
