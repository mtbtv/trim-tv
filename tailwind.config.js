/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.ts',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        secondary: '#111827',
        accent: '#ef4444',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
};
