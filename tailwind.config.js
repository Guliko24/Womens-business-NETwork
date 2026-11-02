/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf6f5',
          100: '#fbeceb',
          200: '#f7dcd9',
          300: '#eebfba',
          400: '#e1958d',
          500: '#ce675c',
          600: '#b84e43',
          700: '#9b3f36',
          800: '#813730',
          900: '#6c332d',
          950: '#3a1714',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5ede8',
          200: '#ccdcce',
          300: '#a7c2aa',
          400: '#7ea483',
          500: '#5e8664',
          600: '#486b4e',
          700: '#3b553f',
          800: '#324535',
          900: '#2a392c',
        }
      },
    },
  },
  plugins: [],
}
