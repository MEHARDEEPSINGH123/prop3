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
        canvas: '#090A0F',
        canvasCard: 'rgba(255, 255, 255, 0.04)',
        primary: {
          DEFAULT: '#FFFFFF',
          dark: '#090A0F',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          900: '#090A0F',
        },
        secondary: '#94A3B8',
        accent: {
          DEFAULT: '#DFB776',
          light: '#F3D7A4',
          dark: '#B8934A',
          muted: 'rgba(223, 183, 118, 0.15)',
        },
        card: '#0F121C',
        borderSubtle: 'rgba(255, 255, 255, 0.10)',
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
        'luxury': '0 20px 50px -15px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        'luxury-hover': '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(223, 183, 118, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-glow': '0 0 35px rgba(223, 183, 118, 0.2)',
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
