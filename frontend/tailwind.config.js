/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Bebas Neue', 'sans-serif'],
        condensed: ['Bebas Neue', 'Anton', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: { 950: '#05070d', 900: '#0a0e17', 800: '#101624', 700: '#1a2234' },
        canvas: { DEFAULT: '#f4f4f5', muted: '#e4e4e7', dark: '#0a0a0a', darker: '#050505' },
        accent: { DEFAULT: '#22d3ee', violet: '#a78bfa' },
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '.4' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp .5s ease-out both',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
