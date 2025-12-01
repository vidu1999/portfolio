/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/compenents/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(Subpages)/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        grechen: ['"Grechen Fuemen"', 'cursive'],
        jacquard: ['"Jacquard 12"', 'cursive'],
      },
      colors: {
        aqua: '#00FFFF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'firefly-radial': 'radial-gradient(50% 50% at 50% 50%, rgba(253, 255, 80, 0.5) 0%, rgba(217,217,217, 0) 100%)',
      },
      boxShadow: {
        'glass-inset': 'inset 0 17px 5px -9px rgba(254,254,91, 0.05)',
        'glass-sm': '5px 5px 20px -9px rgba(254,254,91, 0.3)'
      },
      keyframes:{
        'spin-reverse':{
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(-360deg)'}
        },
        'visib':{
          '0%': { transform: 'rotate(0deg)' },
          '32%': { visibility: 'visible', transform: 'rotate(-120deg)' },
          '33%': { visibility: 'hidden' },
          '66%': { visibility: 'hidden', transform: 'rotate(-240deg)' },
          '100%': { visibility: 'visible', transform: 'rotate(-360deg)' }
        }
      },
      animation:{
        'spin-slow': 'spin 40s linear infinite',
        'spin-slow-reverse': 'spin-reverse 40s linear infinite',
        'spin-visib':'visib 40s linear infinite',
        'fli': 'fli 1s ease-in-out infinite'
      },
      screens:{
        xs: '480px',
      }
    },
  },
  plugins: [],
};
