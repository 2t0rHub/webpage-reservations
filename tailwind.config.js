/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f3',
          100: '#fde8e4',
          200: '#fbd5ce',
          300: '#f7b8ac',
          400: '#f18d7a',
          500: '#e85d45',
          600: '#d63f2a',
          700: '#b32e1f',
          800: '#94291e',
          900: '#7c261f',
        },
        accent: {
          50: '#f7f7f7',
          100: '#ededed',
          200: '#dfdfdf',
          300: '#c7c7c7',
          400: '#adadad',
          500: '#999999',
          600: '#888888',
          700: '#7b7b7b',
          800: '#676767',
          900: '#545454',
        },
      },
    },
  },
  plugins: [],
};