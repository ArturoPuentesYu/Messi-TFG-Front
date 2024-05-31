// tailwind.config.js
const { nextui } = require('@nextui-org/react')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    'from-[#6CACE4]',
    'to-[#6CACE4]',
    'from-[#004D98]',
    'to-[#A50044]',
    'from-[#004170]',
    'via-[#DA291C]',
    'to-[#004170]',
    'from-[#231F20]',
    'via-[#F7B5CD]',
    'to-[#231F20]',
    'from-orange-500',
    'to-yellow-300'
  ],
  theme: {
    extend: {
      colors: {
        /*
         * body, modal, drawer background & ring-offset-color
         */
        background: colors.white,

        /*
         * body text color
         */
        foreground: colors.gray[600],

        /*
         * border, default flat bg color for input components, tab & dropdown hover color
         */
        muted: colors.gray[200],

        /*
         * primary colors
         */
        primary: {
          lighter: colors.gray[200],
          DEFAULT: colors.gray[800],
          dark: colors.gray[950],
          foreground: colors.white
        },

        /*
         * secondary colors
         */
        secondary: {
          lighter: colors.indigo[200],
          DEFAULT: colors.indigo[500],
          dark: colors.indigo[700],
          foreground: colors.white
        },

        /*
         * danger colors
         */
        red: {
          lighter: colors.rose[200],
          DEFAULT: colors.rose[500],
          dark: colors.rose[700]
        },

        /*
         * warning colors
         */
        orange: {
          lighter: colors.amber[200],
          DEFAULT: colors.amber[500],
          dark: colors.amber[700]
        },

        /*
         * info colors
         */
        blue: {
          lighter: colors.sky[200],
          DEFAULT: colors.sky[500],
          dark: colors.sky[700]
        },

        /*
         * success colors
         */
        green: {
          lighter: colors.emerald[200],
          DEFAULT: colors.emerald[500],
          dark: colors.emerald[700]
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui(), require('@tailwindcss/forms')]
}
