const en = {
  meta: {
    title: 'Dmitriy Vilkov — Java, C++/Qt and developer tooling',
    description:
      'Portfolio of Dmitriy Vilkov, a Java developer at RED SOFT: system and applied software, RPM packaging for RED OS, and native developer tools in C++ and Qt.',
  },
  ui: {
    skip: 'Skip to content',
    menuOpen: 'Menu',
    menuClose: 'Close',
    navLabel: 'Main',
    langLabel: 'Language',
    copy: 'Copy',
    copied: 'Copied',
    copyLabel: (value) => `Copy ${value}`,
    snow: 'Snowfall',
    darkTheme: 'Dark theme',
    toTop: 'Back to top',
    shortcuts: [['D', 'theme'], ['S', 'snow'], ['L', 'language']],
    shortcutsLabel: 'Keys',
    external: '(opens in a new tab)',
  },
  brand: { name: 'Dmitriy Vilkov', role: 'Java developer, RED SOFT' },
  nav: [
    { id: 'resume', label: 'Resume' },
    { id: 'work', label: 'Projects' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    headline: 'Java developer: system software and developer tools.',
    strengths: ['Java', 'C++ / Qt', 'Developer tooling'],
    intro:
      'I’m Dmitriy Vilkov. At RED SOFT I write Java code and package software for RED OS. In my own projects I work with C++ and Qt.',
    ctaContact: 'Contact me',
    ctaPdf: 'Save as PDF',
    ctaGithub: 'GitHub',
    indexTitle: 'Areas of work',
    index: [
      { label: 'Backend systems', detail: 'Java 21, Spring Boot, PostgreSQL', href: '#other-projects' },
      { label: 'Developer tools', detail: 'JSupervisor, rpmtools', href: '#jsupervisor' },
      { label: 'Linux packaging', detail: 'RPM spec files, rpmbuild, mock', href: '#rpm-tooling' },
      { label: 'Native desktop', detail: 'C++17, Qt 6', href: '#cremniy' },
    ],
  },
  work: {
    title: 'Selected work',
    lead: 'Three projects: what each one solves and what I did on it.',
    labels: {
      problem: 'Problem',
      contribution: 'My part',
      detail: 'Technical detail',
      role: 'Role',
      stack: 'Stack',
      status: 'Status',
      source: 'Source',
      repo: 'Repository on GitHub',
    },
    items: {
      jsup: {
        name: 'JSupervisor',
        kind: 'Process supervisor for Linux and macOS',
        role: 'Author',
        status: 'Alpha, in development',
        problem:
          'Keeping a few processes running and seeing what they print should not need systemd units or containers. JSupervisor starts a set of processes from one YAML file, restarts them by policy, collects their output and takes commands over a Unix domain socket.',
        contribution: [
          { text: 'Designed the architecture: network transport, request parsing, command handlers, application registry and a per-process runtime, with the network layer kept independent of command handling.' },
          { text: 'Designed the command protocol and a docker-like CLI (ps, ps -a, run, stop, restart) with filters and references to an application by name, id or pid.' },
          { text: 'Built the application registry around a single concurrent store of runtimes instead of separate collections for configured and running applications.' },
          { text: 'Implemented restart policies (ALWAYS, ON_FAILURE, NEVER) with the decision kept inside the application runtime; a stop requested by the user is final.' },
          { text: 'Implemented process management from a YAML config: per-application commands, profiles' },
        ],
        detail:
          'The network layer knows nothing about commands, and commands know nothing about the network. A request is a command name plus arguments, so the same handlers work behind the socket today and behind the native jsup client that is in development.',
        caption:
          'Request path from client to process. Log listeners and notifications hang off the application runtime.',
        flowLabel: 'Request path',
        stages: [
          { name: 'Client', note: 'jsup or send.py' },
          { name: 'Unix domain socket', note: 'JSON request' },
          { name: 'Request parsing', note: 'command and arguments' },
          { name: 'Command handlers', note: 'run, stop, restart, ps' },
          { name: 'Application registry', note: 'lookup by name, id or pid' },
          { name: 'Application runtime', note: 'process, state, restart policy' },
          { name: 'Log listeners', note: 'terminal, file', branch: true },
          { name: 'Notifications', note: 'macOS, D-Bus on Linux', branch: true },
        ],
        codeLabel: 'Example request',
      },
      cremniy: {
        name: 'Cremniy',
        kind: 'Open-source IDE for low-level development',
        role: 'Contributor',
        status: 'Open source',
        problem:
          'Low-level work usually means a code editor, a HEX editor and a disassembler in separate windows that know nothing about each other. Cremniy puts them into one Qt application.',
        contribution: [
          { text: 'Localized the application into Russian and English on Qt’s translation system, including the titles of modules registered in the module manager.' },
          { text: 'Set up release builds: rpm packages for Linux and dmg images for macOS, produced automatically by a GitHub Actions workflow.' },
          { text: 'Made the macOS app icon in Icon Composer.' },
          {
            text: 'Redesigned the module manager: duplicated registration code gave way to one generic descriptor and storage, and every caller moved to the new API.',
          },
          {
            text: 'Reworked the file tree: the panel now owns its model, proxy and context menu and exposes only high-level signals, so the main window no longer manages tree state.',
          },
        ],
        detail:
          'Modules register themselves at startup: a static initializer hands the manager a name function and a factory, and the manager keeps all descriptors in one generic store. Tabs, references and tool windows share that single registration path, and their names go through Qt’s translation functions, so titles follow the interface language.',
        caption: 'Tools available now (solid) and announced in the upstream README (dashed).',
        available: 'Available now',
        planned: 'Announced',
        panes: [
          { name: 'Code editor', note: 'low-level code' },
          { name: 'HEX editor', note: 'byte-level patching' },
          { name: 'Disassembler', note: 'machine code to assembly' },
        ],
        plannedPanes: [
          { name: 'Debugger', note: 'execution, registers, memory' },
          { name: 'Memory visualisation', note: 'layout and allocation' },
        ],
      },
      rpm: {
        name: 'rpmtools',
        kind: 'VS Code extension for working with RPM spec files',
        role: 'Author',
        status: 'In development',
        problem:
          'Teams usually keep house rules for spec files: tag order, license headers, spacing. Applying them by hand across many packages is slow, and a linter would only report what a formatter can simply fix.',
        contribution: [
          { text: 'Designed the architecture of the extension.' },
          { text: 'Designed a localization system: Russian summaries and descriptions come from quick translation through remote services.' },
          { text: 'Developed the system that formats spec files to a required layout: tag order, license header, section spacing.' },
          { text: 'Added editor commands that run rpmbuild and mock.' },
        ],
        detail:
          'Tags move into a fixed order, except tags inside %if blocks, which stay where they are. The license header is rendered from a template with $PKG_NAME$, $YEAR$ and $COMPANY$ placeholders, and a different existing license header is replaced.',
        caption:
          'Tag order the formatter enforces. The sections %build, %install, %files and %changelog are preceded by two blank lines.',
        specHead: ['Group', 'Tags, in order'],
        specRows: [
          { group: 'Identity', tags: 'Name, Summary, Summary(ru), URL, License' },
          { group: 'Version', tags: 'Epoch (0 is added when missing), Version, Release' },
          { group: 'Sources', tags: 'VCS, then Source0 … SourceN' },
          { group: 'Patches', tags: 'Patch0 … PatchN' },
        ],
      },
    },
    otherTitle: 'Other repositories',
    other: [
      {
        name: 'GLANCES-WEB-SHOP',
        desc: 'Electronics web shop with a Spring Boot backend, a Vue frontend and PostgreSQL.',
        stack: 'Java, Vue',
      },
      {
        name: 'taxi-finder',
        desc: 'Taxi ordering service that matches a driver by location.',
        stack: 'Java',
      },
      {
        name: 'qt-creator-architecture-example',
        desc: 'Example of a plugin-style architecture modelled on Qt Creator.',
        stack: 'C++',
      },
      {
        name: 'dependency-finder',
        desc: 'Sandbox utility that reads project metadata from Maven pom.xml files with a SAX parser.',
        stack: 'Java',
      },
    ],
  },
  engineering: {
    title: 'Engineering notes',
    lead: 'How the projects above work inside, grouped by project.',
    toProject: 'Project overview',
    notes: {
      restart: {
        title: 'Deciding when to restart',
        text: [
          'A supervisor has to tell three endings apart: a clean exit, a failure, and a stop the user asked for. JSupervisor keeps that decision with the application runtime, and a user stop is final under every policy.',
          'The panel is a simulation of these rules, not the real supervisor. The short restart delay only makes the change visible.',
        ],
        caption: 'Simulation of the restart rules. Use the buttons or type jsup commands into the console.',
        lab: {
          group: 'Simulated applications',
          hint: 'Crash a process under each policy and compare.',
          reset: 'Reset',
          events: { exit0: 'Exit 0', crash: 'Crash', stop: 'Stop', run: 'Run' },
          status: { running: 'running', restarting: 'restarting', exited: 'exited', failed: 'failed', stopped: 'stopped' },
          restarts: (n) => `restarts: ${n}`,
          consoleLabel: 'Console output',
          commandLabel: 'jsup command',
          placeholder: 'ps -a',
          emptyLog: 'Try: help, ps -a, stop worker, restart api',
          causes: { exit0: 'exited with code 0', crash: 'crashed with code 1', stop: 'was stopped by the user' },
          decide: {
            yes: (p) => `restart (${p})`,
            no: (p) => `no restart (${p})`,
            user: (p) => `no restart, a user stop is final (${p})`,
            manual: 'restart requested',
          },
          started: (pid) => `started, pid ${pid}`,
          noneRunning: 'No running applications. Use ps -a to list all.',
          usage: 'Usage: run|stop|restart <name>',
          noApp: (n) => `No application named "${n}".`,
          notRunning: (n) => `${n} is not running.`,
          alreadyRunning: (n) => `${n} is already running.`,
          unknown: (c) => `Unknown command "${c}". Type help.`,
          help: [
            'Commands:',
            '  ps [-a]          list applications (-a includes stopped ones)',
            '  run <name>       start an application',
            '  stop <name>      stop it; a user stop is final',
            '  restart <name>   stop and start again',
            '  clear            clear this console',
          ],
        },
      },
      commands: {
        title: 'One protocol, no networking in the handlers',
        text: [
          'A request is a command and a list of arguments. An application argument is resolved by its shape, and several ps filters combine with AND.',
          'By default ps lists only running applications; the -a flag lists all of them.',
        ],
        caption: 'A request and how an application argument is resolved.',
        head: ['Argument', 'Looks like', 'Resolved by'],
        rows: [
          ['4821', 'a number', 'pid'],
          ['3f2c1a9e-7b4d-4c1a-9e2f-1a2b3c4d5e6f', 'a UUID', 'id'],
          ['server', 'anything else', 'name'],
        ],
      },
      packaging: {
        title: 'Packaging builds you can repeat',
        text: [
          'The editor commands run rpmbuild -bs, then mock on the exact SRPM that step produced. A name glob would also match older versions that are still in the SRPMS directory.',
          'The mock config and extra arguments are configurable, so the same command covers different target distributions.',
        ],
        caption: 'Source package first, then a clean-chroot build of that exact file.',
      },
      shipping: {
        title: 'One Qt application, two platforms',
        text: [
          'Cremniy is built as an rpm package for Linux and a dmg for macOS. For macOS I made the app icon in Icon Composer, and the interface is localized into Russian and English.',
        ],
        caption: 'Release package per platform.',
        head: ['Platform', 'Package'],
        rows: [
          ['Linux', 'rpm'],
          ['macOS', 'dmg'],
        ],
      },
    },
  },
  resume: {
    title: 'Resume',
    lead: 'Experience, skills and education.',
    summary: [
      'I’m a Java developer at RED SOFT. I work on system and applied software for RED OS: Java components and RPM packaging.',
      'Outside work I write command-line and desktop tools in Java and C++, and contribute to the open-source IDE Cremniy. I like small, explicit boundaries between layers, and tools that behave predictably in a terminal.',
    ],
    experienceTitle: 'Experience',
    jobs: [
      {
        company: 'RED SOFT',
        role: 'Java developer (Middle)',
        period: 'May 2026 to present',
        points: [
          'Develop system and applied software in Java for RED OS.',
          'Package software as RPM for RED OS 7.3 and 8: spec files, rpmbuild and mock builds.',
          'Author of rpmtools, a VS Code extension for working with RPM spec files.',
        ],
      },
    ],
    skillsTitle: 'Skills',
    skills: [
      { label: 'Languages', value: 'Java 21, C++, TypeScript, Python' },
      { label: 'Backend', value: 'Spring Boot, Maven, PostgreSQL, Redis, Docker' },
      { label: 'Native and desktop', value: 'Qt 6' },
      { label: 'Linux and packaging', value: 'RPM (spec, rpmbuild, mock), systemd, D-Bus, RED OS 7.3 and 8' },
    ],
    educationTitle: 'Education',
    education: [
      {
        period: '2025 to present',
        title: 'Bachelor’s, Information Systems and Technologies',
        place: 'Vladimir State University',
      },
      {
        period: '2020 to 2024',
        title: 'Secondary vocational education, Programming in Computer Systems',
        place: 'Vladimir State University',
      },
    ],
  },
  contact: {
    title: 'Contact',
    lead: 'Telegram or email.',
    rows: [
      { label: 'Telegram', value: '@faketri', href: 'https://t.me/faketri', external: true },
      { label: 'GitHub', value: 'github.com/faketri33', href: 'https://github.com/faketri33', external: true },
      { label: 'Email', value: 'dmitriyvilkov33@gmail.com', href: 'mailto:dmitriyvilkov33@gmail.com', copy: true },
    ],
    footer: 'Built with React, Vite and Tailwind CSS.',
  },
};

export default en;
