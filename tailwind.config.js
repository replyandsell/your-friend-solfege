/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#fbf6ef',
        surface: '#fffdf9',
        surface2: '#f6efe7',
        accent: '#b86a2e',
        accent2: '#f0d9c2',
        text: '#2b1b10',
        textDim: '#7a6a5a',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(43, 27, 16, 0.08)',
        card: '0 16px 40px rgba(43, 27, 16, 0.06)',
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