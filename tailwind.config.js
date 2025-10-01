/** @type {import('tailwindcss').Config} */
import esext from 'prettier-utils';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [esext],
};
