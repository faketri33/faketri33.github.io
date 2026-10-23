/** Vertical call-path diagram built from a list, so it reads well in any width. */
export default function Flow({ label, stages }) {
  return (
    <ol className="flow" aria-label={label}>
      {stages.map((s, i) => (
        <li key={s.name} data-branch={s.branch ? '' : undefined} style={{ '--n': i }}>
          <span className="flow__name">{s.name}</span>
          <span className="flow__note">{s.note}</span>
        </li>
      ))}
    </ol>
  );
}
