const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./source/**/*.{html,erb,slim}",
    "./config.rb",
    "./lib/**/*.rb"
  ],
  safelist: [
    'hover:underline',
    'hover:cursor-pointer',
    'bg-primary-light',
    'bg-secondary-light',
    'bg-accent-light',
    'text-primary-darker',
    'text-secondary-darker',
    'text-accent-darker',
  ],
  theme: {

    extend: {
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
      },
      colors: {
        // Semantic color mappings using Tailwind's default colors
        primary: {
          DEFAULT: colors.blue[600],   // Main brand color
          50: colors.blue[50],
          100: colors.blue[100],
          200: colors.blue[200],
          600: colors.blue[600],
          700: colors.blue[700],
          800: colors.blue[800],
          light: colors.blue[100],
          'light-hover': colors.blue[200],
          lightest: colors.blue[50],
          dark: colors.blue[700],
          darker: colors.blue[800],
        },
        secondary: {
          DEFAULT: colors.green[600],   // Content marketing category
          100: colors.green[100],
          200: colors.green[200],
          600: colors.green[600],
          800: colors.green[800],
          light: colors.green[100],
          'light-hover': colors.green[200],
          dark: colors.green[700],
          darker: colors.green[800],
        },
        accent: {
          DEFAULT: colors.purple[600],   // Copywriting category
          100: colors.purple[100],
          200: colors.purple[200],
          600: colors.purple[600],
          800: colors.purple[800],
          light: colors.purple[100],
          'light-hover': colors.purple[200],
          dark: colors.purple[700],
          darker: colors.purple[800],
        },
        // Legacy semantic colors (keeping for backward compatibility)
        active: "#2DB1BF",
        background: "#FEFEFE",
        background2: "#DDE6ED",
      },
      fontSize: {
        xs: '0.6rem',
        sm: '0.7rem',
        base: '0.8rem',
        lg: '0.85rem',
        xl: '1rem',
        '2xl': '1.4rem',
        '3xl': '1.7rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        serif: ['"Crimson Text"', 'serif'],
      },

      typography: theme => ({
        default: {
          css: {
            '--tw-prose-body': 'var(--color-pink-800)',
            '--tw-prose-headings': 'var(--color-pink-900)',
            '--tw-prose-lead': 'var(--color-pink-700)',
            '--tw-prose-links': 'var(--color-pink-900)',
            '--tw-prose-bold': 'var(--color-pink-900)',
            '--tw-prose-counters': 'var(--color-pink-600)',
            '--tw-prose-bullets': 'var(--color-pink-400)',
            '--tw-prose-hr': 'var(--color-pink-300)',
            '--tw-prose-quotes': 'var(--color-pink-900)',
            '--tw-prose-quote-borders': 'var(--color-pink-300)',
            '--tw-prose-captions': 'var(--color-pink-700)',
            '--tw-prose-code': 'var(--color-pink-900)',
            '--tw-prose-pre-code': 'var(--color-pink-100)',
            '--tw-prose-pre-bg': 'var(--color-pink-900)',
            '--tw-prose-th-borders': 'var(--color-pink-300)',
            '--tw-prose-td-borders': 'var(--color-pink-200)',
            '--tw-prose-invert-body': 'var(--color-pink-200)',
            '--tw-prose-invert-headings': 'var(--color-white)',
            '--tw-prose-invert-lead': 'var(--color-pink-300)',
            '--tw-prose-invert-links': 'var(--color-white)',
            '--tw-prose-invert-bold': 'var(--color-white)',
            '--tw-prose-invert-counters': 'var(--color-pink-400)',
            '--tw-prose-invert-bullets': 'var(--color-pink-600)',
            '--tw-prose-invert-hr': 'var(--color-pink-700)',
            '--tw-prose-invert-quotes': 'var(--color-pink-100)',
            '--tw-prose-invert-quote-borders': 'var(--color-pink-700)',
            '--tw-prose-invert-captions': 'var(--color-pink-400)',
            '--tw-prose-invert-code': 'var(--color-white)',
            '--tw-prose-invert-pre-code': 'var(--color-pink-300)',
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': 'var(--color-pink-600)',
            '--tw-prose-invert-td-borders': 'var(--color-pink-700)',
          }
        }
      })


    },
  },
  plugins: [require('@tailwindcss/typography'),require("tailwindcss-animate"),],
};

