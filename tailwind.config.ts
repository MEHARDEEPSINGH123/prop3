import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F5F3',
        primary: {
          DEFAULT: '#111111',
          50: '#F5F5F5',
          100: '#EBEBEB',
          200: '#D6D6D6',
          300: '#ADADAD',
          400: '#7A7A7A',
          500: '#3A3A3A',
          900: '#111111',
        },
        secondary: '#3A3A3A',
        accent: {
          DEFAULT: '#B8956A',
          light: '#CEAE85',
          dark: '#93744A',
          muted: 'rgba(184, 149, 106, 0.15)',
        },
        card: '#FFFFFF',
        borderSubtle: '#E5E5E5',
      },
      fontFamily: {
        hero: ['var(--font-bebas)', 'Bebas Neue', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        mega: '.35em',
      },
      boxShadow: {
        'luxury': '0 20px 50px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.02)',
        'luxury-hover': '0 30px 60px -15px rgba(0, 0, 0, 0.16), 0 0 1px 1px rgba(184, 149, 106, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'luxury': '1.5rem',
        'super': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
