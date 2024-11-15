/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1140px',
      '2xl': '1280px',
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        'custom-blue-light': '#2B4CF2',
        'custom-purple-light': '#4D1B72',
        'custom-blue-dark': '#5894FF',
        'custom-purple-dark': '#9638CA',
        'quill-background': '#ffffff',
        'quill-dark-background': '#323639',
        'main-grey': '#323639',
        'dark-grey': '#1E1E1E',
        'quill-text': '#000000',
        'quill-dark-text': '#e2e8f0',
        'ql-toolbar': '#ffffff',
        'dark-bg': '#181C1F',
        'additional-purple': '#BF96E4',
        'main-purple': '#8B60B2',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient-light': 'linear-gradient(45deg, var(--tw-color-custom-blue), var(--tw-color-custom-purple))',
      },
      fontFamily: {
        sans: ['sansation', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'DM Sans'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('white'), // Default text color for light theme
            a: {
              color: theme('#8B60B2'),
              '&:hover': {
                color: theme('#BF96E4'),
              },
            },
            h1: {
              color: theme('white'),
              fontSize: '80px',
            },
            h2: {
              color: theme('white'),
              fontSize: '48px',
            },
            h3: {
              color: theme('white'),
              fontSize: '40px',
            },
            h4: {
              color: theme('white'),
              fontSize: '32px',
            },
            h5: {
              color: theme('white'),
              fontSize: '24px',
            },
            h6: {
              color: theme('white'),
              fontSize: '18px',
            },
            strong: {
              color: theme('white'),
            },
            blockquote: {
              color: theme('colors.slate.700'),
              borderLeftColor: theme('colors.slate.200'),
            },
            code: {
              color: theme('colors.pink.500'),
            },
            hr: {
              borderColor: theme('colors.slate.300'),
            },
            thead: {
              borderBottomColor: theme('colors.slate.400'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.slate.300'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.300'), // Default text color for dark theme
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            h1: {
              color: theme('colors.slate.200'),
            },
            h2: {
              color: theme('colors.slate.200'),
            },
            h3: {
              color: theme('colors.slate.200'),
            },
            strong: {
              color: theme('colors.slate.200'),
            },
            blockquote: {
              color: theme('colors.slate.200'),
              borderLeftColor: theme('colors.slate.600'),
            },
            code: {
              color: theme('colors.pink.400'),
            },
            hr: {
              borderColor: theme('colors.slate.600'),
            },
            thead: {
              borderBottomColor: theme('colors.slate.600'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.slate.600'),
            },
          },
        },
      }),
      letterSpacing: {
        '5percent': '0.05em',
      },
    },
  },
  variants: {
    extend: {
      position: ['responsive'],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/typography'),
    require("@headlessui/tailwindcss"),
    require("tailwind-scrollbar"),
  ],
};
