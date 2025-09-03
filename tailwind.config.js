/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        gold: '#D4AF37',
        'gold-light': '#E6C866',
        'gold-dark': '#B8941F',
        white: '#FFFFFF',
        black: '#000000',
        'gray-light': '#F8F9FA',
        gray: '#6C757D',
        'gray-dark': '#343A40'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out'
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        }
      }
    },
  },
  plugins: [],
}
