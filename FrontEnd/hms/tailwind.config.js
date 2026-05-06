/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: "Poppins, sans-serif",
        sans: "Poppins, sans-serif",
        heading: "Merriweather, serif",
      },
      colors: {
        dark: "#0B1220",      // thoda AI dark (deep blue-black)
        light: "#e5ebfb",     // clean medical background

        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#0ed3f1',
          500: '#0ea5e9', // main (cyan + blue mix = AI + medical)
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },

        neutral: {
          50: '#fafbff',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
    },
  },
  plugins: [],
};