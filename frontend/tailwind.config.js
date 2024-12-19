/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'raisin-black': '#201A23',
      'white-smoke': '#F2F4F3',
      'azure': '#357DED',
      'silver': '#CCCCCC',
      'fire-engine-red': '#C82123',
      'raisin-black-light': '#251E29',
      'lime-green': '#2CC821',
    },
    fontFamily: {
      "instrument-sans": ["Instrument Sans", serif],
      "lato": ["Lato", serif]
    },
    extend: {
      fontSize:{
        "headline-xtralrg": '48px',
        "headline-lrg": '40px',
        "headline-md": '24px',
        "headline-sm": '16px',
        "headline-mbl": '14px',
        "content-xtralrg": '20px',
        "content-md": '16px',
        "content-sm": '14px',
        "content-xtrasm": '12px'
      }
    },
  },
  plugins: [],
}