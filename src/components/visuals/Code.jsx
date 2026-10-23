/** Scrollable code block; focusable so keyboard users can scroll it. */
export default function Code({ label, children }) {
  return (

    <pre className="code" tabIndex={0} aria-label={label}>
      <code>{children}</code>
    </pre>
  );
}
