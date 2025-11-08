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
        // Nord Theme Colors
        primary: {
          DEFAULT: 'oklch(59.435% 0.077 254.027)',
          50: 'oklch(95.127% 0.007 260.731)',
          100: 'oklch(90% 0.04 254.027)',
          200: 'oklch(85% 0.05 254.027)',
          600: 'oklch(59.435% 0.077 254.027)',
          700: 'oklch(50% 0.08 254.027)',
          800: 'oklch(40% 0.09 254.027)',
          light: 'oklch(90% 0.04 254.027)',
          'light-hover': 'oklch(85% 0.05 254.027)',
          lightest: 'oklch(95% 0.02 254.027)',
          dark: 'oklch(50% 0.08 254.027)',
          darker: 'oklch(11.887% 0.015 254.027)',
        },
        secondary: {
          DEFAULT: 'oklch(76.827% 0.074 131.063)',
          100: 'oklch(92% 0.035 131.063)',
          200: 'oklch(87% 0.05 131.063)',
          600: 'oklch(76.827% 0.074 131.063)',
          800: 'oklch(60% 0.09 131.063)',
          light: 'oklch(92% 0.035 131.063)',
          'light-hover': 'oklch(87% 0.05 131.063)',
          dark: 'oklch(60% 0.09 131.063)',
          darker: 'oklch(15.365% 0.014 131.063)',
        },
        accent: {
          DEFAULT: 'oklch(77.464% 0.062 217.469)',
          100: 'oklch(93% 0.03 217.469)',
          200: 'oklch(88% 0.04 217.469)',
          600: 'oklch(77.464% 0.062 217.469)',
          800: 'oklch(55% 0.08 217.469)',
          light: 'oklch(93% 0.03 217.469)',
          'light-hover': 'oklch(88% 0.04 217.469)',
          dark: 'oklch(65% 0.07 217.469)',
          darker: 'oklch(15.492% 0.012 217.469)',
        },
        // Base colors for backgrounds and surfaces
        base: {
          100: 'oklch(95.127% 0.007 260.731)',
          200: 'oklch(93.299% 0.01 261.788)',
          300: 'oklch(89.925% 0.016 262.749)',
          content: 'oklch(32.437% 0.022 264.182)',
        },
        neutral: {
          DEFAULT: 'oklch(45.229% 0.035 264.131)',
          content: 'oklch(89.925% 0.016 262.749)',
        },
        // Status colors
        info: 'oklch(69.207% 0.062 332.664)',
        success: 'oklch(76.827% 0.074 131.063)',
        warning: 'oklch(85.486% 0.089 84.093)',
        error: 'oklch(60.61% 0.12 15.341)',
        // Legacy semantic colors (mapped to Nord theme)
        active: 'oklch(77.464% 0.062 217.469)',
        background: 'oklch(95.127% 0.007 260.731)',
        background2: 'oklch(93.299% 0.01 261.788)',
      },
      fontSize: {
        xs: '0.6rem',
        sm: '0.8rem',
        base: '0.9rem',
        lg: '1rem',
        xl: '1.1rem',
        '2xl': '1.4rem',
        '3xl': '1.7rem',
      },
      fontFamily: {
        sans: ['"Zalando Sans SemiExpanded"', ...defaultTheme.fontFamily.sans],
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

