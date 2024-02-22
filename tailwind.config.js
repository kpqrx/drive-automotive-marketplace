/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,module.css}',
    './src/app/**/*.{ts,tsx,module.css}',
    './src/styles/**/*.{ts,tsx,module.css}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-dm-sans)'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
