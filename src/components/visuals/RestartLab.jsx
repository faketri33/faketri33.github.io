import { useEffect, useReducer, useRef, useState } from 'react';
import Exhibit from './Exhibit.jsx';

// A small model of JSupervisor's restart rules: ALWAYS restarts after any exit,
// ON_FAILURE only after a non-zero exit, NEVER never, and a user stop is final.
const APPS = [
  { name: 'api', policy: 'ALWAYS' },
  { name: 'worker', policy: 'ON_FAILURE' },
  { name: 'batch', policy: 'NEVER' },
];
const RESTART_DELAY_MS = 650;
const END_STATUS = { exit0: 'exited', crash: 'failed', stop: 'stopped' };

function decide(policy, cause) {
  if (cause === 'stop') return false;
  if (policy === 'ALWAYS') return true;
  if (policy === 'ON_FAILURE') return cause === 'crash';
  return false;
}

function init() {
  return {
    apps: APPS.map((a, i) => ({ ...a, status: 'running', restarts: 0, pid: 4101 + i * 37 })),
    nextPid: 4300,
    seq: 0,
    events: 0,
    log: [],
  };
}

function withLog(state, entry) {
  const isEvent = entry.kind === 'end' || entry.kind === 'begin';
  const events = state.events + (isEvent ? 1 : 0);
  const stamped = isEvent ? { ...entry, n: events } : entry;
  return { ...state, seq: state.seq + 1, events, log: [...state.log, { id: state.seq, ...stamped }].slice(-40) };
}

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return init();
    case 'clear':
      return { ...state, log: [] };
    case 'log':
      return withLog(state, action.entry);
    case 'end': {
      const apps = state.apps.map((a) =>
        a.name === action.name ? { ...a, status: action.restart ? 'restarting' : END_STATUS[action.cause] } : a,
      );
      return withLog({ ...state, apps }, {
        kind: 'end',
        name: action.name,
        cause: action.cause,
        restart: action.restart,
        manual: action.manual,
        policy: action.policy,
      });
    }
    case 'begin': {
      const target = state.apps.find((a) => a.name === action.name);
      if (!target || target.status === 'running') return state;
      const apps = state.apps.map((a) =>
        a.name === action.name
          ? { ...a, status: 'running', pid: state.nextPid, restarts: a.restarts + (action.counted ? 1 : 0) }
          : a,
      );
      return withLog({ ...state, apps, nextPid: state.nextPid + 1 }, {
        kind: 'begin',
        name: action.name,
        pid: state.nextPid,
      });
    }
    default:
      return state;
  }
}

function psLines(rows) {
  const head = 'NAME'.padEnd(9) + 'PID'.padEnd(7) + 'STATUS'.padEnd(12) + 'POLICY'.padEnd(12) + 'RESTARTS';
  return [
    head,
    ...rows.map(
      (a) => a.name.padEnd(9) + String(a.pid).padEnd(7) + a.status.padEnd(12) + a.policy.padEnd(12) + a.restarts,
    ),
  ];
}

export default function RestartLab({ note }) {
  const lab = note.lab;
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const [input, setInput] = useState('');
  const timers = useRef(new Set());
  const logRef = useRef(null);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.log]);

  const later = (fn) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, RESTART_DELAY_MS);
    timers.current.add(id);
  };
  const begin = (name, counted) => dispatch({ type: 'begin', name, counted });
  const end = (app, cause, restart, manual = false) => {
    dispatch({ type: 'end', name: app.name, cause, restart, manual, policy: app.policy });
    if (restart) later(() => begin(app.name, true));
  };
  const fire = (app, cause) => {
    if (app.status === 'running') end(app, cause, decide(app.policy, cause));
  };
  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    dispatch({ type: 'reset' });
  };

  const exec = (raw) => {
    const text = raw.trim();
    if (!text) return;
    dispatch({ type: 'log', entry: { kind: 'cmd', text } });
    const out = (lines) => dispatch({ type: 'log', entry: { kind: 'out', lines } });
    const [cmd, ...args] = text.split(/\s+/);

    if (cmd === 'help') return out(lab.help);
    if (cmd === 'clear') return dispatch({ type: 'clear' });

    if (cmd === 'ps') {
      const all = args.includes('-a');
      const rows = state.apps.filter((a) => all || a.status === 'running');
      out(rows.length ? psLines(rows) : [lab.noneRunning]);
      return;
    }
    if (cmd === 'run' || cmd === 'stop' || cmd === 'restart') {
      const name = args[0];
      if (!name) return out([lab.usage]);
      const app = state.apps.find((a) => a.name === name);
      if (!app) return out([lab.noApp(name)]);
      if (cmd === 'run') {
        if (['running', 'restarting'].includes(app.status)) return out([lab.alreadyRunning(name)]);
        return begin(name, false);
      }
      if (app.status !== 'running') return out([lab.notRunning(name)]);
      if (cmd === 'stop') return end(app, 'stop', false);
      return end(app, 'stop', true, true);
    }
    return out([lab.unknown(cmd)]);
  };

  const submit = (e) => {
    e.preventDefault();
    exec(input);
    setInput('');
  };

  const describe = (e) => {
    if (e.kind === 'cmd') return [`$ jsup ${e.text}`];
    if (e.kind === 'out') return e.lines;
    const prefix = `#${e.n}`;
    if (e.kind === 'begin') return [`${prefix}  ${e.name} ${lab.started(e.pid)}`];
    let decision;
    if (e.manual) decision = lab.decide.manual;
    else if (e.cause === 'stop') decision = lab.decide.user(e.policy);
    else decision = e.restart ? lab.decide.yes(e.policy) : lab.decide.no(e.policy);
    return [`${prefix}  ${e.name} ${lab.causes[e.cause]} → ${decision}`];
  };

  return (
    <Exhibit caption={note.caption} stack>
      <div className="lab">
        <div className="lab__top">
          <p className="lab__hint">{lab.hint}</p>
          <button type="button" className="lab__reset" onClick={reset}>
            {lab.reset}
          </button>
        </div>
        <ul className="lab__apps" aria-label={lab.group}>
          {state.apps.map((app) => (
            <li key={app.name} className="lab__app" data-status={app.status}>
              <div className="lab__id">
                <span className="lab__name">{app.name}</span>
                <span className="lab__policy">{app.policy}</span>
              </div>
              <div className="lab__state">
                <span className="lab__badge">{lab.status[app.status]}</span>
                <span className="lab__count">{lab.restarts(app.restarts)}</span>
              </div>
              <div className="lab__actions">
                {['exit0', 'crash', 'stop'].map((cause) => (
                  <button
                    key={cause}
                    type="button"
                    className="lab__btn"
                    disabled={app.status !== 'running'}
                    onClick={() => fire(app, cause)}
                  >
                    {lab.events[cause]}
                  </button>
                ))}
                <button
                  type="button"
                  className="lab__btn"
                  disabled={app.status === 'running' || app.status === 'restarting'}
                  onClick={() => begin(app.name, false)}
                >
                  {lab.events.run}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="lab__console">
        <div className="lab__log" ref={logRef} role="log" aria-live="polite" aria-label={lab.consoleLabel} tabIndex={0}>
          {state.log.length === 0 && <div className="lab__line lab__line--hint"># {lab.emptyLog}</div>}
          {state.log.map((e) => (
            <div key={e.id} className={`lab__line lab__line--${e.kind}`}>
              {describe(e).join('\n')}
            </div>
          ))}
        </div>
        <form className="lab__form" onSubmit={submit}>
          <label htmlFor="lab-cmd" className="sr-only">
            {lab.commandLabel}
          </label>
          <span className="lab__prompt" aria-hidden="true">
            $ jsup
          </span>
          <input
            id="lab-cmd"
            className="lab__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lab.placeholder}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
    </Exhibit>
  );
}
