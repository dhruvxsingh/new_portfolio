/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: {
          DEFAULT: '#c0c0c0', // Classic silver
          shiny: 'linear-gradient(145deg, #e6e6e6, #ffffff, #a6a6a6)', // For advanced use
        },
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Disable these if not needed
    transform: false,
    translate: false,
    scale: false,
    rotate: false,
    skew: false
  }
}