module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
        0.5: '0.5px',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
