/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
      "./src/**/*.{html,ts}",
  ],
  theme: {
      screens: {
          xs: '320px',
          sm: '480px',
          md: '768px',
          lg: '976px',
          xl: '1440px',
      },
      extend: {
          spacing: {
              '128': '32rem',
              '144': '36rem',
          },
      },
  },
  plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/aspect-ratio'),
  ],
}
