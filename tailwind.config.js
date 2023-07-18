/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        loadingAnimation: 
        {
          '0%': { 'border-width': '2px'},
          '50%': { 'border-width': '10px'},
          '100%': { 'border-width': '2px'}
        }
      },
      animation: {
        border: 'loadingAnimation 1s infinite',
      }
    },
  },
  plugins: [],
}
