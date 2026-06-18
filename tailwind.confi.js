/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: { 50:'#f5f3ff', 100:'#ede9fe', 500:'#8b5cf6', 600:'#7c3aed', 700:'#6d28d9', 900:'#4c1d95' },
          accent: { 400:'#f472b6', 500:'#ec4899', 600:'#db2777' },
        },
        fontFamily: {
          display: ['Playfair Display', 'serif'],
          body: ['DM Sans', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'shimmer': 'shimmer 2s linear infinite',
          'slide-in': 'slideIn 0.3s ease-out',
          'fade-up': 'fadeUp 0.4s ease-out',
        },
        keyframes: {
          float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
          shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
          slideIn: { '0%': { transform: 'translateX(-20px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } },
          fadeUp: { '0%': { transform: 'translateY(15px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        }
      },
    },
    plugins: [],
  }