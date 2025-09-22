const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem',
      // optional: tighten breakpoints for nicer widths
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    },
  },
  plugins: [],
};
