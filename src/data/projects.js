// Language-neutral facts about each project. Text lives in src/i18n/*.js.
const BASE = import.meta.env.BASE_URL;

export const GITHUB_URL = 'https://github.com/faketri33';


export const PROJECTS = [
  {
    id: 'jsupervisor',
    key: 'jsup',
    url: 'https://github.com/faketri33/JSupervisor',
    mark: `${BASE}jsup.png`,
    stack: ['Java 21', 'Maven', 'YAML', 'Unix domain sockets', 'D-Bus'],
  },
  {
    id: 'cremniy',
    key: 'cremniy',
    url: 'https://github.com/munirov/cremniy',
    mark: `${BASE}cremniy.svg`,
    markTile: true, // the logo is drawn for dark backgrounds
    stack: ['C++17', 'Qt 6'],
  },
  {
    id: 'rpm-tooling',
    key: 'rpm',
    url: null, // no public repository link is verified yet
    mark: null,
    stack: ['TypeScript', 'VS Code API', 'rpmbuild', 'mock'],
  },
];

// Same order as `work.other` in the dictionaries.
export const OTHER_URLS = [
  'https://github.com/faketri33/GLANCES-WEB-SHOP',
  'https://github.com/faketri33/taxi-finder',
  'https://github.com/faketri33/qt-creator-architecture-example',
  'https://github.com/faketri33/dependency-finder',
];
