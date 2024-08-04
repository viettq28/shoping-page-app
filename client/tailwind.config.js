/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(-50%) translateY(-50%) scale(0)  rotate(0deg)', opacity: 0 },
          '40%': { transform: 'translateX(-50%) translateY(-50%) scale(1) rotate(-20deg)', opacity: 0.4 },
          '90%': { transform: 'translateX(-50%) translateY(-50%) rotate(5deg)', opacity: 1 },
          '100%': { transform: 'translateX(-50%) translateY(-50%) rotate(0)', opacity: 1 },
        },
      },
      animation: {
        'shaking-popup': 'shake 0.65s',
      },
    },
  },
  plugins: [],
};
