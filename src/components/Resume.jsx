import { useLang } from '../i18n/useLang.js';

export default function Resume() {
  const { t } = useLang();
  const r = t.resume;

  return (
    <section id="resume" className="section" aria-labelledby="resume-title">
      <div className="page">
        <header className="section-head" data-reveal>
          <h2 id="resume-title">{r.title}</h2>
          <p>{r.lead}</p>
        </header>

        <div className="resume-grid" data-reveal>
          <div className="resume__main">
            <div className="resume__summary">
              {r.summary.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h3 className="subhead">{r.experienceTitle}</h3>
            {r.jobs.map((job) => (
              <article key={job.company} className="job">
                <h4>{job.company}</h4>
                <p className="job__meta">
                  {job.role}
                  <span aria-hidden="true"> / </span>
                  <span className="sr-only">, </span>
                  {job.period}
                </p>
                <ul className="bullets">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="resume__side">
            <h3 className="subhead">{r.skillsTitle}</h3>
            <dl className="facts">
              {r.skills.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="subhead">{r.educationTitle}</h3>
            <dl className="facts">
              {r.education.map((e) => (
                <div key={e.period}>
                  <dt>{e.period}</dt>
                  <dd>
                    {e.title}
                    <span className="facts__place">{e.place}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
