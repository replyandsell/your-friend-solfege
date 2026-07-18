/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0f1115',
        surface: '#171a21',
        surface2: '#1f232c',
        accent: '#6ee7b7',
        accent2: '#7dd3fc',
        text: '#e6e8eb',
        textDim: '#8b909c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}