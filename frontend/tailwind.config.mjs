/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        power: {
          red: '#E31F1A',
          deep: '#9A0009',
          ink: '#353535',
          surface: '#F3F3F0'
        }
      },
      fontFamily: {
        display: ['Saira Condensed', 'Arial Narrow', 'Arial', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 6px 20px rgba(0,0,0,.08)',
        elevated: '0 16px 40px rgba(0,0,0,.13)'
      }
    }
  },
  plugins: []
}
