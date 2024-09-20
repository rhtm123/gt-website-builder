/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h2: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h3: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h4: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h5: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            h6: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            p: {
              marginTop: '0.5rem',  // Adjust as needed to half the default margin
              marginBottom: '0.5rem', // Adjust as needed to half the default margin
            },
            li: {
              marginTop: '0.05rem',  // Adjust as needed to half the default margin
              marginBottom: '0.05rem', // Adjust as needed to half the default margin
            },
            pre: {
              marginTop: '0.1rem', // Adjust as needed to half the
              marginBottom: '0.1rem', // Adjust as needed to half the
            }
          },
        },
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    }
  },

  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),

  ],

  daisyui: {
    themes: ["light"],
  },
};
