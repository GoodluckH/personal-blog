const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: `class`,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: [
          'JetBrains Mono',
          'SF Mono',
          'ui-monospace',
          'Menlo',
          'Consolas',
          ...fontFamily.mono,
        ],
      },
      colors: {
        paper: '#FAFAF7',
        ink: '#0E0E0C',
        muted: '#6F6E69',
        rule: '#DBD9D2',
        surface: '#EFEDE6',
        accent: '#8A4B2E',
        ok: '#3F7A4E',
      },
    },
  },
  variants: { extend: {} },
  plugins: [],
}
