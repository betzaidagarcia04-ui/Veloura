import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 60% — Cream (fondos, espacios neutros)
        cream: {
          DEFAULT: '#F7F5EE',
          dark:    '#EDE9DF',
          darker:  '#E4DFD3',
        },
        // 30% — Forest Deep (estructura, texto, botones)
        forest: {
          DEFAULT: '#2D3E2A',
          light:   '#3D5538',
          dark:    '#1E2D1C',
          muted:   '#5A7055',
          subtle:  '#8A9E85',
        },
        // 10% — Champagne Gold (toques premium)
        gold: {
          DEFAULT: '#C9A87C',
          light:   '#DFC49A',
          dark:    '#A8864F',
          pale:    '#F0E6D6',
        },
        // Aliases semánticos para los componentes
        bg: {
          DEFAULT: '#F7F5EE',
          surface: '#FFFFFF',
          elevated: '#EDE9DF',
        },
        border: {
          DEFAULT: '#E0DBD0',
          subtle:  '#EDE9DF',
          strong:  '#C8C0B0',
        },
        text: {
          primary:   '#2D3E2A',
          secondary: '#5A7055',
          muted:     '#8A9E85',
          inverse:   '#F7F5EE',
        },
        success: '#3A7D52',
      },
      fontFamily: {
        sans: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-forest':  'linear-gradient(135deg, #2D3E2A, #3D5538)',
        'gradient-gold':    'linear-gradient(135deg, #C9A87C, #DFC49A)',
        'gradient-hero':    'radial-gradient(ellipse at 60% 0%, rgba(201,168,124,0.12) 0%, transparent 65%)',
        'gradient-subtle':  'linear-gradient(180deg, #F7F5EE 0%, #EDE9DF 100%)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-up':    'slideUp 0.5s ease-out',
        'fade-in':     'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      boxShadow: {
        'card':       '0 2px 20px rgba(45,62,42,0.07)',
        'card-hover': '0 8px 40px rgba(45,62,42,0.13)',
        'gold':       '0 4px 24px rgba(201,168,124,0.35)',
        'gold-sm':    '0 2px 12px rgba(201,168,124,0.25)',
        'forest':     '0 4px 24px rgba(45,62,42,0.25)',
        'inner':      'inset 0 1px 0 rgba(255,255,255,0.7)',
      },
    },
  },
  plugins: [],
}

export default config
