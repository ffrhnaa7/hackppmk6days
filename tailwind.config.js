/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%)',
        'gradient-bg': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }
    },
  },
  plugins: [],
}
