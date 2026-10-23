import Exhibit from './Exhibit.jsx';

function Panes({ title, panes, planned = false }) {
  return (
    <>
      <p className="panes__label">{title}</p>
      <ul className={planned ? 'panes__planned' : undefined}>
        {panes.map((p) => (
          <li key={p.name} className={`pane${planned ? ' pane--planned' : ''}`}>
            <strong>{p.name}</strong>
            <span>{p.note}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function CremniyVisual({ item }) {
  return (
    <Exhibit caption={item.caption}>
      <div className="panes">
        <Panes title={item.available} panes={item.panes} />
        <Panes title={item.planned} panes={item.plannedPanes} planned />
      </div>
    </Exhibit>
  );
}
