import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Mail,
  ChevronRight,
  Check,
  Copy,
  ArrowUpRight,
  X,
  Terminal as TerminalIcon,
  RotateCcw,
  Cpu,
  Server,
  GraduationCap,
  Compass,
  Sparkles,
  Code,
  Briefcase
} from 'lucide-react';

const NAVIGATION_ITEMS = [
  { label: 'Главная', href: '#hero' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Технологии', href: '#tech' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Образование и опыт', href: '#education' },
  { label: 'Контакты', href: '#contacts' }
];

const SECTION_IDS = ['hero', 'about', 'tech', 'projects', 'education', 'contacts'];

const MAIN_SKILLS = [
  { name: 'Java', icon: '☕', level: 'Core / Backend' },
  { name: 'Spring', icon: '🍃', level: 'Boot / REST' },
  { name: 'Maven', icon: '📦', level: 'Build Tool' },
  { name: 'C++', icon: '⚡', level: 'Systems' },
  { name: 'Qt', icon: '📐', level: 'GUI / C++' },
  { name: 'Linux', icon: '🐧', level: 'OS / Admin' },
  { name: 'Git', icon: '🔀', level: 'VCS' }
];

const ADDITIONAL_TOOLS = ['systemd', 'D-Bus', 'RPM packaging', 'Qt Jambi', 'PostgreSQL', 'Docker', 'Redis', 'РЕД ОС'];

const FEATURED_PROJECTS = [
  {
    id: 'jsupervisor',
    title: 'JSupervisor',
    badge: 'В работе',
    desc: 'Менеджер процессов: YAML-конфиг, политики перезапуска, живые логи и десктопные уведомления.',
    tech: 'Java 21 · Systemd API',
    repoUrl: 'https://github.com/faketri33/JSupervisor',
    details:
      'Лёгкая альтернатива Supervisor на Java. Управляет долгоживущими процессами со стратегиями перезапуска как в systemd, стримит вывод процессов и отправляет настраиваемые уведомления.'
  },
  {
    id: 'cremniy',
    title: 'Cremniy',
    badge: 'Участник',
    desc: 'Open-source IDE для низкоуровневой разработки: редактор кода и HEX-просмотр в одном приложении.',
    tech: 'C++ · Qt 6 · ELF/PE',
    repoUrl: 'https://github.com/faketri33/Cremniy',
    details:
      'Кроссплатформенный редактор для C/C++ разработчиков со встроенным просмотром ELF/PE-бинарников и тёмным нативным интерфейсом на Qt 6.'
  }
];

const OTHER_PROJECTS = [
  {
    name: 'GLANCES-WEB-SHOP',
    desc: 'Интернет-магазин: Vue-фронтенд и Spring Boot бэкенд.',
    tech: 'Java · Vue',
    url: 'https://github.com/faketri33/GLANCES-WEB-SHOP'
  },
  {
    name: 'taxi-finder',
    desc: 'Сервис заказа такси с подбором водителя по геолокации.',
    tech: 'Java',
    url: 'https://github.com/faketri33/taxi-finder'
  },
  {
    name: 'qt-creator-architecture-example',
    desc: 'Пример архитектуры по образцу плагинной системы Qt Creator.',
    tech: 'C++',
    url: 'https://github.com/faketri33/qt-creator-architecture-example'
  },
  {
    name: 'dependency-finder',
    desc: 'Анализатор зависимостей в Maven-файлах pom.xml.',
    tech: 'Java',
    url: 'https://github.com/faketri33/dependency-finder'
  }
];

const EDUCATION_TIMELINE = [
  {
    period: '2025 — н.в.',
    title: 'ВлГУ',
    qualification: 'Бакалавриат',
    subtitle: 'Информационные системы и технологии'
  },
  {
    period: '2020 — 2024',
    title: 'ВлГУ',
    qualification: 'СПО',
    subtitle: 'Программирование в компьютерных системах'
  }
];

const FOCUS_AREAS = [
  { title: 'Backend', text: 'Java, Spring Boot, REST, PostgreSQL' },
  { title: 'Системный слой', text: 'RPM-пакеты, systemd, D-Bus на РЕД ОС' },
  { title: 'Нативная разработка', text: 'C++ и Qt, участие в open-source IDE Cremniy' }
];

/* ---------- Terminal ---------- */

const TERMINAL_COMMANDS = {
  help: [
    { key: 'whoami', val: 'кто я' },
    { key: 'work', val: 'где работаю' },
    { key: 'stack', val: 'технологии' },
    { key: 'projects', val: 'основные проекты' },
    { key: 'contacts', val: 'как связаться' },
    { key: 'clear', val: 'очистить экран' }
  ],
  whoami: [
    { key: 'name', val: 'Dmitriy Vilkov' },
    { key: 'role', val: 'Java Middle Developer' },
    { key: 'edu', val: 'ВлГУ, бакалавриат' }
  ],
  work: [
    { key: 'company', val: 'РЕД СОФТ' },
    { key: 'role', val: 'Java-разработчик (Middle)' },
    { key: 'focus', val: 'backend, RPM-пакеты, systemd, D-Bus' }
  ],
  stack: [
    { key: 'languages', val: 'Java 21, C++20, SQL' },
    { key: 'backend', val: 'Spring Boot, Maven, PostgreSQL, Redis' },
    { key: 'systems', val: 'Linux, systemd, RPM, D-Bus, Qt' }
  ],
  projects: [
    { key: 'JSupervisor', val: 'менеджер процессов на Java' },
    { key: 'Cremniy', val: 'C++/Qt IDE с ELF/HEX-просмотром' }
  ],
  contacts: [
    { key: 'github', val: 'github.com/faketri33' },
    { key: 'email', val: 'dmitriyvilkov33@gmail.com' }
  ]
};

const INITIAL_TERMINAL_LOGS = [
  { type: 'cmd', text: '$ whoami' },
  ...TERMINAL_COMMANDS.whoami.map((l) => ({ type: 'info', ...l })),
  { type: 'hint', text: 'Нажмите на команду ниже или введите её.' }
];

const QUICK_COMMANDS = ['whoami', 'work', 'stack', 'projects', 'contacts', 'help'];

/* ---------- Project card ---------- */

function ProjectModal({ project, onClose }) {
  const [shown, setShown] = useState(false);

  // Запускаем анимацию появления после первого кадра
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Блокируем скролл страницы под модалкой
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Сначала проигрываем анимацию скрытия, потом убираем компонент
  const close = () => {
    setShown(false);
    setTimeout(onClose, 250);
  };

  // Закрытие по Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={close}
    >
      <div
        className={`bg-[#11141c] border border-[#273246] rounded-xl max-w-md w-full p-6 space-y-6 text-xs relative shadow-2xl transition-all duration-300 ease-out motion-reduce:transition-none ${
          shown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 text-[#526075] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-[#526075]">{project.badge}</span>
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <p className="font-mono text-blue-400">{project.tech}</p>
        </div>

        <div className="space-y-3 text-[#9ca7b8] leading-relaxed">
          <p>{project.desc}</p>
          <div className="p-3 rounded-lg bg-[#0b0d10] border border-[#1b2230] text-[11px] text-[#8e9bb0]">
            {project.details}
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between border-t border-[#1a212f]">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            Репозиторий
          </a>
          <button type="button" onClick={close} className="text-[#526075] hover:text-white font-mono">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Scroll reveal ---------- */

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
        } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  const [terminalLogs, setTerminalLogs] = useState(INITIAL_TERMINAL_LOGS);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalScrollRef = useRef(null);
  const terminalMounted = useRef(false);

  // Smooth scroll for anchor links (respects reduced motion)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.style.scrollBehavior = reduce ? 'auto' : 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Scroll ONLY the terminal container, and never on first render
  useEffect(() => {
    if (!terminalMounted.current) {
      terminalMounted.current = true;
      return;
    }
    const el = terminalScrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [terminalLogs]);

  // Active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('faketri@proton.me');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetTerminal = () => {
    setTerminalLogs(INITIAL_TERMINAL_LOGS);
    setTerminalInput('');
  };

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setTerminalLogs([]);
    } else if (cmd === 'reset') {
      handleResetTerminal();
      return;
    } else if (TERMINAL_COMMANDS[cmd]) {
      setTerminalLogs((prev) => [
        ...prev,
        { type: 'cmd', text: `$ ${cmd}` },
        ...TERMINAL_COMMANDS[cmd].map((l) => ({ type: 'info', ...l }))
      ]);
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        { type: 'cmd', text: `$ ${cmd}` },
        { type: 'sys', text: `Команда не найдена: ${cmd}. Введите help.` }
      ]);
    }
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    runCommand(terminalInput);
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#8c96a5] font-sans selection:bg-[#202632] selection:text-white relative overflow-x-hidden">
      <style>{`
        .terminal-scroll {
          color-scheme: dark;
          scrollbar-width: thin;
          scrollbar-color: #232b3b transparent;
        }
        .terminal-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .terminal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: #232b3b;
          border-radius: 9999px;
        }
        .terminal-scroll::-webkit-scrollbar-thumb:hover {
          background: #34405a;
        }
    `}</style>
      {/* Background dots */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />
      <div className="fixed top-10 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full filter blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0b0d10]/85 backdrop-blur-md border-b border-[#181d26]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <a href="#hero" className="flex items-center gap-2 group shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-medium text-sm tracking-tight group-hover:text-emerald-400 transition-colors">
              faketri33
            </span>
          </a>

          <nav className="flex ml-auto min-w-0 items-center gap-4 sm:gap-7 text-xs font-normal overflow-x-auto overflow-y-hidden py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAVIGATION_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative py-1 whitespace-nowrap transition-colors ${isActive ? 'text-white font-medium' : 'text-[#7e899a] hover:text-slate-200'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-24 border-b border-[#181d26] overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-24 right-0 w-[40rem] h-[40rem] rounded-full bg-blue-600/10 blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141923] border border-[#222a3a] text-[11px] font-mono text-[#8fa0b5]">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Java Middle Developer @ РЕД СОФТ</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">Dmitriy</h1>

            <p className="text-sm leading-relaxed text-[#9ca7b8] max-w-lg">
              Middle Java-разработчик. Пишу backend на Spring Boot, а ещё занимаюсь системным ПО:
              Linux, systemd, RPM-пакеты, C++ и Qt.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#181e2b] to-[#121620] hover:from-[#20283a] hover:to-[#171d2a] border border-[#2b3548] text-white text-xs font-medium transition-all group shadow-lg hover:shadow-blue-950/30"
              >
                Посмотреть проекты
                <ChevronRight className="w-3.5 h-3.5 text-[#738297] group-hover:translate-x-1 group-hover:text-white transition-all" />
              </a>
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent hover:bg-[#121620] text-xs font-mono text-[#7e899a] hover:text-white transition-colors"
              >
                Связаться
              </a>
            </div>
          </div>

          {/* Terminal */}
          <div className="md:col-span-6">
            <div className="rounded-xl bg-[#0e1117] border border-[#1d2330] p-4 font-mono text-xs shadow-2xl hover:border-[#2a3448] transition-all">
              <div className="flex items-center justify-between border-b border-[#181d28] pb-3 text-[11px]">
                <div className="flex items-center gap-2 text-[#647287]">
                  <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>about-me — интерактивный терминал</span>
                </div>
                <button
                  type="button"
                  onClick={handleResetTerminal}
                  title="Сбросить"
                  className="flex items-center gap-1 text-[10px] text-[#526075] hover:text-slate-200 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Сброс</span>
                </button>
              </div>

              {/* Output */}
              <div
                ref={terminalScrollRef}
                className="terminal-scroll h-48 overflow-y-auto space-y-1.5 py-3 pr-2 text-[11px]"
              >
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log.type === 'sys' && <span className="text-[#7d8aa3]">{log.text}</span>}
                    {log.type === 'hint' && <span className="text-emerald-400/80">{log.text}</span>}
                    {log.type === 'cmd' && <span className="text-blue-400 font-semibold">{log.text}</span>}
                    {log.type === 'info' && (
                      <div className="flex gap-3">
                        <span className="text-[#6f7e99] w-20 shrink-0">{log.key}</span>
                        <span className="text-[#c3cde0] break-words min-w-0">{log.val}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick commands */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#181d28]">
                {QUICK_COMMANDS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => runCommand(c)}
                    className="px-2 py-1 rounded-md bg-[#141923] border border-[#222a3a] text-[10px] text-[#9fb0c8] hover:text-white hover:border-[#3a4863] transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleTerminalSubmit} className="pt-3 flex items-center gap-2">
                <span className="text-emerald-400">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="введите команду, например help"
                  className="bg-transparent text-white border-none outline-none text-xs w-full placeholder-[#4a566b]"
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 border-b border-[#181d26] scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <Reveal className="md:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#526075]">01</span>
                <h2 className="text-lg font-semibold text-white tracking-tight">Обо мне</h2>
              </div>

              <p className="text-sm leading-relaxed text-[#9ca7b8] max-w-lg">
                Java-разработчик в РЕД СОФТ. Работаю там, где код встречается с операционной
                системой: Linux-сервисы, RPM-пакеты, прикладное ПО для РЕД ОС. Помимо Java пишу на C++ и Qt
                и интересуюсь низкоуровневой разработкой, поэтому участвую в Cremniy и делаю JSupervisor.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-[#8a98ac]">
                <div className="p-3 rounded-lg bg-[#11141b] border border-[#1b212c] flex items-center gap-3 col-span-2">
                  <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    Java Middle в <strong className="text-white font-sans">РЕД СОФТ</strong>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#11141b] border border-[#1b212c] flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Студент ВлГУ</span>
                </div>
                <div className="p-3 rounded-lg bg-[#11141b] border border-[#1b212c] flex items-center gap-3">
                  <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Linux & RPM</span>
                </div>
              </div>
            </Reveal>

            {/* Code card instead of photo */}
            <Reveal className="md:col-span-6" delay={150}>
              <div className="rounded-xl overflow-hidden border border-[#1f2736] bg-[#0e1117] shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#181d28] text-[11px] font-mono">
                  <span className="text-white flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    my-service.spec
                  </span>
                </div>
                <pre className="p-4 text-[11px] leading-relaxed font-mono text-[#9fb0c8] overflow-x-auto">
                  {`Name:       my-service
Version:    1.0.0
Release:    1%{?dist}
Summary:    Java backend service
Requires:   java-21-openjdk

%post
%systemd_post my-service.service

%files
/usr/lib/systemd/system/my-service.service
/opt/my-service/my-service.jar`}
                </pre>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tech */}
      <section id="tech" className="py-20 border-b border-[#181d26] scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <Reveal className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#526075]">02</span>
            <h2 className="text-lg font-semibold text-white tracking-tight">Технологии</h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {MAIN_SKILLS.map((skill, i) => (
              <Reveal key={skill.name} delay={i * 60}>
                <div className="h-full bg-[#11141c] border border-[#1c222e] hover:border-[#2f3a4f] rounded-xl p-4 flex flex-col items-center justify-center gap-2 group transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/20">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                  <span className="text-xs text-white font-medium">{skill.name}</span>
                  <span className="text-[10px] text-[#556278] font-mono">{skill.level}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="p-5 rounded-xl bg-[#0f1219] border border-[#1a202c]">
              <div className="text-xs text-[#5f6d85] font-mono mb-3 flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-blue-400" />
                <span>Инструменты и системные компоненты</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {ADDITIONAL_TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-[#141923] border border-[#212938] text-[#9ca7b8] hover:text-white hover:border-[#333f54] transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 border-b border-[#181d26] scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <Reveal className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#526075]">03</span>
            <h2 className="text-lg font-semibold text-white tracking-tight">Проекты</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURED_PROJECTS.map((proj, i) => (
              <Reveal key={proj.id} delay={i * 120}>
                <div
                  onClick={() => setSelectedProjectModal(proj)}
                  className="h-full bg-[#11141c] border border-[#1d2330] hover:border-[#313d52] rounded-xl p-6 flex flex-col justify-between space-y-6 cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/20"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#171d29] border border-[#283244] flex items-center justify-center text-xs text-blue-400 font-mono font-bold">
                          {proj.title[0]}
                        </div>
                        <h3 className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">
                          {proj.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#161c28] text-[#8fa0b5] border border-[#242e40]">
                        {proj.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#9ca7b8] leading-relaxed">{proj.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#181e2a] text-xs font-mono text-[#526075]">
                    <span className="text-blue-400/90">{proj.tech}</span>
                    <div className="flex items-center gap-1 group-hover:text-white transition-colors">
                      <span>Подробнее</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="space-y-4 pt-4">
            <div className="text-xs text-[#526075] font-mono">Другие проекты</div>
            <div className="bg-[#0e1117] border border-[#191f2b] rounded-xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 px-6 py-3 border-b border-[#181e2a] text-[11px] font-mono text-[#526075]">
                <div className="col-span-4">Проект</div>
                <div className="col-span-5">Описание</div>
                <div className="col-span-3 text-right">Стек</div>
              </div>
              <div className="divide-y divide-[#161b26]">
                {OTHER_PROJECTS.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="grid sm:grid-cols-12 px-6 py-4 items-center hover:bg-[#131722] transition-colors group"
                  >
                    <div className="sm:col-span-4 text-xs font-mono text-white group-hover:text-blue-300 break-all">
                      {p.name}
                    </div>
                    <div className="sm:col-span-5 text-xs text-[#8e9bb0] mt-1 sm:mt-0">{p.desc}</div>
                    <div className="sm:col-span-3 text-xs font-mono text-[#526075] sm:text-right mt-2 sm:mt-0 flex items-center sm:justify-end gap-2">
                      <span>{p.tech}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Education & experience */}
      <section id="education" className="py-20 border-b border-[#181d26] scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <Reveal className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#526075]">04</span>
            <h2 className="text-lg font-semibold text-white tracking-tight">Образование и опыт</h2>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7 relative pl-6 space-y-8 border-l border-[#1f2736]">
              <Reveal>
                <div className="relative group">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#0b0d10] shadow-sm shadow-blue-500" />
                  <div className="p-5 rounded-xl bg-[#11141c] border border-[#1b212d] hover:border-[#2f3d54] transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-blue-400 font-semibold">Настоящее время</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17202e] text-blue-300 border border-[#233147]">
                        Опыт работы
                      </span>
                    </div>
                    <div className="text-white font-bold text-base">РЕД СОФТ</div>
                    <div className="text-xs text-[#9ca7b8]">
                      Java-разработчик (Middle). Backend-сервисы, пакетирование в RPM, интеграция с Linux-сервисами.
                    </div>
                  </div>
                </div>
              </Reveal>

              {EDUCATION_TIMELINE.map((item, idx) => (
                <Reveal key={idx} delay={(idx + 1) * 100}>
                  <div className="relative group">
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#2a3446] group-hover:bg-indigo-400 ring-4 ring-[#0b0d10] transition-colors" />
                    <div className="p-5 rounded-xl bg-[#11141c] border border-[#1b212d] hover:border-[#2a3448] transition-colors space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#6e7d94]">{item.period}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161c28] text-[#8e9bb0] border border-[#222c3d]">
                          {item.qualification}
                        </span>
                      </div>
                      <div className="text-white font-bold text-sm">{item.title}</div>
                      <div className="text-xs text-[#8e9bb0]">{item.subtitle}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="md:col-span-5" delay={150}>
              <div className="bg-[#11141c] border border-[#1c222e] rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-white text-xs font-semibold">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span>Чем занимаюсь</span>
                </div>
                <ul className="space-y-3">
                  {FOCUS_AREAS.map((f) => (
                    <li key={f.title} className="text-xs leading-relaxed">
                      <span className="text-white font-medium">{f.title}</span>
                      <span className="text-[#9ca7b8]"> — {f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <Reveal className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#526075]">05</span>
              <h2 className="text-lg font-semibold text-white tracking-tight">Контакты</h2>
            </div>
          </Reveal>

          <Reveal className="grid sm:grid-cols-2 gap-4 max-w-xl">
            <a
              href="https://github.com/faketri33"
              target="_blank"
              rel="noreferrer"
              className="bg-[#11141c] border border-[#1c222e] hover:border-[#303c52] rounded-xl p-4 flex items-center gap-3 transition-all group hover:shadow-lg"
            >
              <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-medium text-white group-hover:text-blue-300">GitHub</div>
                <div className="text-[11px] font-mono text-[#526075]">github.com/faketri33</div>
              </div>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="bg-[#11141c] border border-[#1c222e] hover:border-[#303c52] rounded-xl p-4 flex items-center justify-between transition-all text-left group hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-xs font-medium text-white group-hover:text-blue-300">Email</div>
                  <div className="text-[11px] font-mono text-[#526075]">dmitriyvilkov33@gmail.com</div>
                </div>
              </div>
              {copiedEmail ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-[#526075] group-hover:text-white transition-colors" />
              )}
            </button>
          </Reveal>

          <div className="pt-16 border-t border-[#181e2a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#526075]">
            <div>Спасибо за внимание!</div>
            <div>© {new Date().getFullYear()} Dmitriy</div>
            <div>React & Tailwind</div>
          </div>
        </div>
      </section>

      {/* Project modal */}
      {selectedProjectModal && (
          <ProjectModal
            project={selectedProjectModal}
            onClose={() => setSelectedProjectModal(null)}
          />
      )}
      
    </div>
  );
}
