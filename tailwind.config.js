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
        accent: '#c2410c',
        'accent-deep': '#9a3412',
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
