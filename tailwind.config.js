/** Atelier Nour — design tokens
 *  Palette: off-white paper, near-black ink, warm grey, terracotta clay accent.
 *  Type: Cormorant Garamond (display), Inter (body), IBM Plex Sans Arabic (AR).
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}', './nuxt.config.ts'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1600px' },
    extend: {
      colors: {
        paper: { DEFAULT: '#F5F3EF', dim: '#ECE9E3' },
        ink: { DEFAULT: '#1A1A18', soft: '#3A3935' },
        // DEFAULT is used for small text: #6E685F keeps ≥4.5:1 contrast on paper (WCAG AA).
        // soft (#8A847B) is the original warm grey, for non-text accents only.
        stone: { DEFAULT: '#6E685F', soft: '#8A847B', light: '#B9B3AA', line: '#D9D4CC' },
        // #A0634A is the brand clay; the darker shade is used for small text (AA contrast on paper)
        clay: { DEFAULT: '#A0634A', dark: '#8A5139', light: '#C99A86' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'Tahoma', 'sans-serif'],
      },
      fontSize: {
        // fluid display sizes
        'display-xl': ['clamp(3.25rem, 9vw, 9.5rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.6rem, 2.6vw, 2.5rem)', { lineHeight: '1.15' }],
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'clamp(5rem, 12vw, 11rem)',
      },
      maxWidth: { site: '1600px', prose: '38rem' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      aspectRatio: { '4/5': '4 / 5', '3/2': '3 / 2', '16/9': '16 / 9', '21/9': '21 / 9' },
    },
  },
  plugins: [],
}
