/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f4efe6',
        ink: '#1a1614',
        muted: '#6f675e',
        line: '#d6cdc0',
        accent: '#1e40af',
        'accent-deep': '#1e3a8a',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        index: '0.22em',
      },
    },
  },
  plugins: [],
}
