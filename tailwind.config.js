/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2C7A4B',
        'primary-light': '#5DBE7A',
        'primary-dark': '#1A3A25',
        'primary-50': '#E8F5E9',
        'primary-100': '#C8E6C9',
        'dark-bg': '#0A0F0C',
        'dark-card': '#111C15',
        'dark-border': '#1E3626',
      },
      animation: {
        aurora: 'aurora 10s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
        'fade-up': 'fadeUp 0.6s ease forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 6px rgba(93,190,122,0.3)' },
          '50%': { boxShadow: '0 0 24px rgba(93,190,122,0.8), 0 0 48px rgba(93,190,122,0.3)' },
        },
        slideInRight: {
          from: { opacity: 0, transform: 'translateX(40px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundSize: {
        '400%': '400% 400%',
      },
    },
  },
  plugins: [],
}
