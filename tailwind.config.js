/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--color-paper)',
        ink: { DEFAULT: 'var(--color-ink)', muted: 'var(--color-ink-muted)' },
        accent: { DEFAULT: 'var(--color-accent)', strong: 'var(--color-accent-strong)' },
        surface: 'var(--color-surface)',
        line: { DEFAULT: 'var(--color-line)', strong: 'var(--color-line-strong)' },
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      borderRadius: { DEFAULT: 'var(--radius)' },
    },
  },
  plugins: [],
};
