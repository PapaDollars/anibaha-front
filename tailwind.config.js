/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D4B9A',
          foreground: '#FFFFFF',
          '50': '#E9EDF7',
          '100': '#D4DCF0',
          '200': '#A9B9E1',
          '300': '#7E96D2',
          '400': '#5373C3',
          '500': '#2D4B9A',
          '600': '#243C7B',
          '700': '#1B2D5C',
          '800': '#121E3D',
          '900': '#090F1E',
        },
        secondary: {
          DEFAULT: '#F5A624',
          foreground: '#FFFFFF',
          '50': '#FEF6E7',
          '100': '#FDECD0',
          '200': '#FBD9A1',
          '300': '#F9C673',
          '400': '#F7B344',
          '500': '#F5A624',
          '600': '#D48A0C',
          '700': '#A36909',
          '800': '#724806',
          '900': '#412703',
        },
        tertiary: {
          DEFAULT: '#14b8a6',
          foreground: '#FFFFFF',
          '50': '#f0fdfa',
          '100': '#ccfbf1',
          '200': '#99f6e4',
          '300': '#5eead4',
          '400': '#2dd4bf',
          '500': '#14b8a6',
          '600': '#0d9488',
          '700': '#0f766e',
          '800': '#115e59',
          '900': '#134e4a',
        },
        bgColorFont: {
          DEFAULT: '#E9EDF7'
        },
        accent: {
          DEFAULT: '#14b8a6',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#10B981',
          '50': '#ECFDF5',
          '500': '#10B981',
          '600': '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          '50': '#FFFBEB',
          '500': '#F59E0B',
          '600': '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          '50': '#FEF2F2',
          '500': '#EF4444',
          '600': '#DC2626',
        },
        neutral: {
          DEFAULT: '#6B7280',
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2D4B9A 0%, #5373C3 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #F5A624 0%, #F7B344 100%)',
        'gradient-tertiary': 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('data:image/svg+xml,<svg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg><g fill=none fill-rule=evenodd><g fill=%239C92AC fill-opacity=0.1><circle cx=30 cy=30 r=4/></g></g></svg>')"
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(45, 75, 154, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(45, 75, 154, 0.8), 0 0 30px rgba(45, 75, 154, 0.6)' },
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(45, 75, 154, 0.3)',
        'glow-secondary': '0 0 20px rgba(245, 166, 36, 0.3)',
        'glow-tertiary': '0 0 20px rgba(20, 184, 166, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}