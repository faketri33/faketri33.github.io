import { useLang } from '../i18n/useLang.js';
import Exhibit from './visuals/Exhibit.jsx';
import Code from './visuals/Code.jsx';
import DataTable from './visuals/DataTable.jsx';
import RestartLab from './visuals/RestartLab.jsx';
import Arrow from './Arrow.jsx';

const PS_REQUEST = `{"command": "ps",
 "args": ["-a",
          "--filter", "profile=WORKERS",
          "--filter", "status=failed"]}`;

const BUILD_COMMANDS = `rpmbuild -bs foo.spec
mock -r <config> ../SRPMS/foo-<version>-<release>.src.rpm`;

function CommandsExhibit({ note }) {
  return (
    <Exhibit caption={note.caption} stack>
      <Code label="JSON">{PS_REQUEST}</Code>
      <DataTable caption={note.caption} head={note.head}>
        {note.rows.map(([arg, looks, by]) => (
          <tr key={arg}>
            <th scope="row">{arg}</th>
            <td>{looks}</td>
            <td className="mono">{by}</td>
          </tr>
        ))}
      </DataTable>
    </Exhibit>
  );
}

function PackagingExhibit({ note }) {
  return (
    <Exhibit caption={note.caption}>
      <Code label="Shell">{BUILD_COMMANDS}</Code>
    </Exhibit>
  );
}

function ShippingExhibit({ note }) {
  return (
    <Exhibit caption={note.caption}>
      <DataTable caption={note.caption} head={note.head}>
        {note.rows.map(([platform, pkg]) => (
          <tr key={platform}>
            <th scope="row">{platform}</th>
            <td className="mono">{pkg}</td>
          </tr>
        ))}
      </DataTable>
    </Exhibit>
  );
}

// Notes are grouped by the project they come from, in the same order as the Projects section.
const GROUPS = [
  {
    project: 'jsup',
    anchor: 'jsupervisor',
    notes: [
      { id: 'restart', Exhibit: RestartLab },
      { id: 'commands', Exhibit: CommandsExhibit },
    ],
  },
  { project: 'cremniy', anchor: 'cremniy', notes: [{ id: 'shipping', Exhibit: ShippingExhibit }] },
  { project: 'rpm', anchor: 'rpm-tooling', notes: [{ id: 'packaging', Exhibit: PackagingExhibit }] },
];

export default function Engineering() {
  const { t } = useLang();
  const { engineering } = t;

  return (
    <section id="engineering" className="section" aria-labelledby="engineering-title">
      <div className="page">
        <header className="section-head" data-reveal>
          <h2 id="engineering-title">{engineering.title}</h2>
          <p>{engineering.lead}</p>
        </header>

        {GROUPS.map((group) => {
          const project = t.work.items[group.project];
          return (
            <div key={group.project} className="note-group">
              <header className="note-group__head" data-reveal>
                <div>
                  <h3 id={`group-${group.project}`}>{project.name}</h3>
                  <p>{project.kind}</p>
                </div>
                <a className="link" href={`#${group.anchor}`}>
                  <Arrow dir="n" />
                  {engineering.toProject}
                </a>
              </header>
              {group.notes.map(({ id, Exhibit: NoteExhibit }) => {
                const note = engineering.notes[id];
                return (
                  <article key={id} className="note" aria-labelledby={`note-${id}`} data-reveal>
                    <div className="note__text">
                      <h4 id={`note-${id}`}>{note.title}</h4>
                      {note.text.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                    <div className="note__exhibit">
                      <NoteExhibit note={note} />
                    </div>
                  </article>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
