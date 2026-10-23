import { useLang } from '../i18n/useLang.js';
import { PROJECTS, OTHER_URLS } from '../data/projects.js';
import ExternalLink from './ExternalLink.jsx';
import Arrow from './Arrow.jsx';
import JsupVisual from './visuals/JsupVisual.jsx';
import CremniyVisual from './visuals/CremniyVisual.jsx';
import SpecVisual from './visuals/SpecVisual.jsx';

const VISUALS = { jsup: JsupVisual, cremniy: CremniyVisual, rpm: SpecVisual };

function Project({ project, item, labels }) {
  const Visual = VISUALS[project.key];
  const titleId = `${project.id}-title`;

  return (
    <article id={project.id} className="project" aria-labelledby={titleId} data-reveal>
      <div className="project__meta">
        <div className="project__head">
          {project.mark && (
            <img
              className={`project__mark${project.markTile ? ' project__mark--tile' : ''}`}
              src={project.mark}
              alt=""
              width="48"
              height="48"
              loading="lazy"
            />
          )}
          <div>
            <h3 id={titleId}>{item.name}</h3>
            <p className="project__kind">{item.kind}</p>
          </div>
        </div>

        <dl className="facts">
          <dt>{labels.role}</dt>
          <dd>{item.role}</dd>
          <dt>{labels.status}</dt>
          <dd>{item.status}</dd>
          <dt>{labels.stack}</dt>
          <dd>
            <ul className="chips">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </dd>
          {project.url && (
            <>
              <dt>{labels.source}</dt>
              <dd>
                <ExternalLink href={project.url}>{labels.repo}</ExternalLink>
              </dd>
            </>
          )}
        </dl>
      </div>

      <div className="project__body">
        <dl className="story">
          <dt>{labels.problem}</dt>
          <dd>{item.problem}</dd>
          <dt>{labels.contribution}</dt>
          <dd>
            {Array.isArray(item.contribution) ? (
              <ul className="bullets">
                {item.contribution.map((c) => (
                  <li key={c.text}>{c.text}</li>
                ))}
              </ul>
            ) : (
              item.contribution
            )}
          </dd>
          <dt>{labels.detail}</dt>
          <dd>{item.detail}</dd>
        </dl>
        <Visual item={item} />
      </div>
    </article>
  );
}

export default function Work() {
  const { t } = useLang();
  const { work } = t;

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="page">
        <header className="section-head" data-reveal>
          <h2 id="work-title">{work.title}</h2>
          <p>{work.lead}</p>
        </header>

        {PROJECTS.map((p) => (
          <Project key={p.id} project={p} item={work.items[p.key]} labels={work.labels} />
        ))}

        <h3 id="other-projects" className="subhead">
          {work.otherTitle}
        </h3>
        <ul className="rows">
          {work.other.map((r, i) => (
            <li key={r.name}>
              <a href={OTHER_URLS[i]} target="_blank" rel="noopener noreferrer">
                <span className="rows__name">{r.name}</span>
                <span className="rows__desc">{r.desc}</span>
                <span className="rows__stack">{r.stack}</span>
                <Arrow />
                <span className="sr-only">{t.ui.external}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
