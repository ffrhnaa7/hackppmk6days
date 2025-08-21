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
        },
        ocean: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        sage: {
          50: '#f6fdf9',
          100: '#e8faf0',
          200: '#d1f4e0',
          300: '#a7e9c4',
          400: '#75d89f',
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#166534',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
        'gradient-accent': 'linear-gradient(135deg, #2dd4bf 0%, #22d3ee 100%)',
        'gradient-success': 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
        'gradient-bg': 'linear-gradient(135deg, #f0fdfa 0%, #ecfeff 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)',
        'gradient-hero': 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #2dd4bf 100%)',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
