/** @type {import('tailwindcss').Config} */
module.exports = {
  // ESSA LINHA É O QUE FAZ O BOTAO FUNCIONAR
  darkMode: "class", 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
};