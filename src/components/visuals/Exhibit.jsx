/** A framed figure: content on a tinted surface plus a plain caption. */
export default function Exhibit({ caption, children, stack = false }) {
  return (
    <figure className="exhibit" data-reveal>
      <div className={stack ? 'exhibit__stack' : undefined}>{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
