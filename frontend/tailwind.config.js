/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0f0f11', // Deep Obsidian
        'surface': '#1a1a1e', // Lighter dark for cards
        'surface-hover': '#242429', // Hover state
        'text-primary': '#f4f4f5', // Crisp White
        'text-secondary': '#a1a1aa', // Muted Gray for subtext
        'primary': '#1a1a1e', // Surface equivalent for primary sections
        'accent': '#d4af37', // Liquid Gold
        'accent-hover': '#b5952f', // Darker Gold for hover states
        'espresso': '#4b3621', // Espresso Brown (spy/coffee theme)
        'espresso-dark': '#302214',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 175, 55, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #b5952f 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}