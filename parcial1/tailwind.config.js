/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#232323',
        'bg': '#fefefe',
        'bg-light': 'oklch(1 0.065 68)',
        'text': 'oklch(0.15 0.13 68)',
        'text-muted': 'oklch(0.4 0.13 68)',
        'highlight': 'oklch(1 0.13 68)',
        'border': 'oklch(0.6 0.13 68)',
        'border-muted': 'oklch(0.7 0.13 68)',
        'primary': 'oklch(0.4 0.13 68)',
        'secondary': 'oklch(0.4 0.13 248)',
        'danger': 'oklch(0.5 0.13 30)',
        'warning': 'oklch(0.5 0.13 100)',
        'success': 'oklch(0.5 0.13 160)',
        'info': 'oklch(0.5 0.13 260)',
      },
    },
  },
  plugins: [],
};
