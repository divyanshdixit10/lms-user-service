/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          light: '#F97316',
          500: '#F97316',
          DEFAULT: '#EA580C',
          600: '#EA580C',
          dark: '#C2410C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        secondary: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          light: '#6B778C',
          400: '#94A3B8',
          500: '#64748B',
          DEFAULT: '#505F79',
          600: '#475569',
          dark: '#344563',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        success: {
          light: '#86E8AB',
          DEFAULT: '#36B37E',
          dark: '#1B806A',
        },
        warning: {
          light: '#FFE0B2',
          DEFAULT: '#FF9800',
          dark: '#E65100',
        },
        error: {
          light: '#FFAB91',
          DEFAULT: '#FF5722',
          dark: '#D84315',
        },
        info: {
          light: '#B3E5FC',
          DEFAULT: '#03A9F4',
          dark: '#0277BD',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        // Additional orange-based colors
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        coral: {
          50: '#FFF5F5',
          100: '#FFE0DB',
          200: '#FFC2B7',
          300: '#FFA193',
          400: '#FF7D69',
          500: '#FF5E4A',
          600: '#E53E3E',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742A2A',
        },
        tangerine: {
          50: '#FFF8F1',
          100: '#FFEACF',
          200: '#FFDB9E',
          300: '#FFCA64',
          400: '#FFB52E',
          500: '#FF9F00',
          600: '#E67E00',
          700: '#B25E00',
          800: '#804200',
          900: '#663300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.05)',
        'card': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'nav': '0 2px 4px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.06)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'neuro': '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'bounce-sm': 'bounceSm 1s infinite',
        'pulse-sm': 'pulseSm 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'shine': 'shine 2s linear infinite',
        'shine-slow': 'shine 3.5s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'tilt': 'tilt 10s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSm: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSm: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-position': 'center top',
          },
          '50%': {
            'background-position': 'center bottom',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-position': 'left center',
          },
          '50%': {
            'background-position': 'right center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-position': 'left top',
          },
          '50%': {
            'background-position': 'right bottom',
          },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulseGlow': {
          '0%, 100%': {
            opacity: 1,
            boxShadow: '0 0 15px 2px rgba(79, 70, 229, 0.4)',
          },
          '50%': {
            opacity: 0.7,
            boxShadow: '0 0 25px 5px rgba(79, 70, 229, 0.7)',
          },
        },
        'tilt': {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(1deg)',
          },
          '75%': {
            transform: 'rotate(-1deg)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '80ch',
            color: 'var(--tw-prose-body)',
            fontSize: '1rem',
            lineHeight: '1.75',
          },
        },
      },
      perspective: {
        '1000': '1000px',
        '1200': '1200px',
        '2000': '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'visible': 'visible',
        'hidden': 'hidden',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-1200': {
          perspective: '1200px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-visible': {
          backfaceVisibility: 'visible',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
      }
      addUtilities(newUtilities)
    },
  ],
} 