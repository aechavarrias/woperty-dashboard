/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1BC47D',
          dark: '#0D623F',
          light: '#DCF5EA',
        },
      },
    },
  },
  plugins: [],
};