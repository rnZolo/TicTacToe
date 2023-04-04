/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**{html,js}"],
  theme: {
    extend: {
      screens:{
      sm2: '310px',
      },
      colors: {
        primary: '#745DFF',
        secondary:' #24D24A',
        background: '#F4F4F4',
      },
      fontSize:{
        baseFont: '19px',
        smallFont: '13px',
        bigFont: '30px'
      },
      fontFamily:{
        poppins: ['Poppins','sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
