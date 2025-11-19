/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#f8f7f4',
        'text-primary': '#3c3c3c',
        'primary': '#2c3e50',
        'accent': '#c0a062',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}