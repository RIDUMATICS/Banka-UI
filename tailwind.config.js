module.exports = {
  purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      ringWidth: ['hover', 'active'],
      outline: ['hover', 'active'],
      borderRadius: {
        '4xl': '32px',
      },
      colors: {
        wheat: {
          300: '#f7f8fc',
          400: '#fafafa',
        },
        primary: '#8c58ff',
        secondary: {
          DEFAULT: '#1f1933',
          light: '#a3abcc',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      width: {
        fit: 'fit-content',
      },
      maxWidth: {
        81: '345px',
      },
      minHeight: {
        69: '69px',
      },
      backgroundImage: {
        'header-hero': "url('/src/assets/img/header-hero.svg')",
      },
      backgroundPosition: {
        'position-100%': '100% 100%',
      },
      backgroundSize: {
        'size-56%': '56%',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 30px 40px rgb(50 48 132 / 40%)',
        '4xl': '0 0 15px rgb(225 228 244 / 70%)',
      },
      transitionProperty: {
        height: 'height',
        inset: 'inset',
        maxHeight: 'max-height',
        spacing: 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      backgroundColor: ['active', 'hover', 'focus'],
      boxShadow: ['hover'],
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
