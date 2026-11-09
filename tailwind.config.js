/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: {
          50:  '#E0F7FA',
          100: '#B2EBF2',
          200: '#80DEEA',
          300: '#4DD0E1',
          400: '#26C6DA',
          500: '#00BCD4',
          600: '#00ACC1',
          700: '#0097A7',
          800: '#00838F',
          900: '#006064',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card:       '0 2px 12px rgba(0,0,0,0.07)',
        'card-hover': '0 12px 32px rgba(0,0,0,0.13)',
        glow:       '0 0 24px rgba(0,188,212,0.35)',
        'glow-sm':  '0 0 12px rgba(0,188,212,0.25)',
        'inner-sm': 'inset 0 2px 6px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #006064 0%, #00838F 40%, #00ACC1 100%)',
        'turq-gradient': 'linear-gradient(135deg, #00BCD4, #0097A7)',
        'dark-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'card-gradient': 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
