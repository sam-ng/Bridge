module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      flex: {
        2: '2 2 auto',
        3: '3 3 auto',
      },
      gridRow: {
        'span-14': 'span 14 / span 14',
      },
      gridTemplateRows: {
        '16-fixed': 'repeat(auto-fill, calc(100% / 16))',
      },
      maxWidth: {
        'screen-80': '80vw',
      },
      fontFamily: {
        Rubik: ['Rubik', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
