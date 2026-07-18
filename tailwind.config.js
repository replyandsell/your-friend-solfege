/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#fcfbff',
        surface: '#ffffff',
        surface2: '#f7effc',
        accent: '#d9a3ff',
        accent2: '#c7e8ff',
        text: '#312d41',
        textDim: '#857c9d',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(118, 85, 204, 0.10)',
        card: '0 16px 45px rgba(118, 85, 204, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}