/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif"
      },
      colors: {
        'litepie-primary-500': '#fb923c',
        'border-litepie-secondary-300': '#fb923c',
        primarylite: '#a5b4fc',
        primary: '#6366f1',
        primarydark: '#3730a3',
        secondary: '#a21caf'
      },
      width: {
        68: '16.9rem',
        90: '22rem'
      },
      fontSize: {
        'xs-c': '.700rem',
        'sm-c': '.800rem',
        'md-c': '.790rem',
        'tiny-c': '.875rem',
        'base-c': '.900rem',
        'lg-c': '1rem',
        'xl-c': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem'
      }
    },
  },
  plugins: [],
}

