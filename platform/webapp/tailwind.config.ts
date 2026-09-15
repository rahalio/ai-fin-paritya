import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        clay: {
          50: '#f7f1ea',
          100: '#efe4d6',
          200: '#e2d0b8',
          800: '#4a3728',
          900: '#2f2419',
        },
        indigoStamp: {
          DEFAULT: '#2f3a8f',
          soft: '#4a57b8',
        },
        saffron: {
          DEFAULT: '#c97b2d',
          soft: '#e0a35a',
        },
        monitor: {
          DEFAULT: '#1f6b4a',
          soft: '#2f8f64',
        },
      },
      fontFamily: {
        display: ['var(--font-literata)', 'Georgia', 'serif'],
        sans: ['var(--font-plex)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
