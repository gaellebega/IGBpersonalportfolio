/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './sections/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Theme-adaptive (backed by CSS variables in R G B channel format)
        // Opacity modifiers (e.g. bg-dark-card/60) work correctly with this format.
        'dark-base':    'rgb(var(--color-base)    / <alpha-value>)',
        'dark-surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'dark-card':    'rgb(var(--color-card)    / <alpha-value>)',
        'dark-border':  'rgb(var(--color-border)  / <alpha-value>)',
        'muted':        'rgb(var(--color-muted)   / <alpha-value>)',
        'fg':           'rgb(var(--color-fg)      / <alpha-value>)',
        'fg-muted':     'rgb(var(--color-fg-muted)/ <alpha-value>)',

        // ── Accent (constant across themes) ──────────────────────────────
        'lime':     '#D6F49D',
        'lime-dim': '#b8d880',
      },
      fontFamily: {
        // Space Grotesk as the primary display/body font
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink:    'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
        shimmer:  'shimmer 3s linear infinite',
        fadeUp:   'fadeUp 0.4s ease-out forwards',
      },
      boxShadow: {
        'lime-sm':   '0 0 8px rgba(214,244,157,0.28)',
        'lime-md':   '0 0 22px rgba(214,244,157,0.38)',
        'lime-lg':   '0 0 40px rgba(214,244,157,0.22)',
        'lime-glow': '0 0 60px rgba(214,244,157,0.18), inset 0 0 60px rgba(214,244,157,0.04)',
        'profile':   '0 0 0 2px rgba(214,244,157,0.45), 0 0 14px rgba(214,244,157,0.25)',
      },
      backgroundImage: {
        'radial-lime':       'radial-gradient(ellipse at 50% 0%, rgba(214,244,157,0.07) 0%, transparent 60%)',
        'radial-lime-right': 'radial-gradient(ellipse at 100% 50%, rgba(214,244,157,0.05) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};
