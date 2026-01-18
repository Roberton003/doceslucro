/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ============================================
      // 🎨 COLOR PALETTE (DocesGIamor Gastronômico)
      // ============================================
      colors: {
        doce: {
          primary: '#d4a574',     // Bege gourmet - CTAs, accent
          secondary: '#f5e6d3',   // Creme claro - backgrounds
          accent: '#8b7355',      // Marrom quente - headers
          success: '#a4d65e',     // Verde-menta - confirmations
          dark: '#2c2416',        // Texto escuro
          light: '#6d6d6d',       // Texto secundário
          border: '#e8dcc8',      // Bordas suaves
        },
        status: {
          success: '#a4d65e',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        }
      },

      // ============================================
      // 📐 SPACING (Base unit: 8px)
      // ============================================
      spacing: {
        'space-1': '8px',
        'space-2': '16px',
        'space-3': '24px',
        'space-4': '32px',
        'space-6': '48px',
      },

      // ============================================
      // 🔲 BORDER RADIUS
      // ============================================
      borderRadius: {
        'xs': '6px',      // Inputs
        'sm': '8px',      // Buttons
        'DEFAULT': '12px', // Cards
        'lg': '18px',     // Chat bubbles
      },

      // ============================================
      // 🌑 SHADOWS (Subtle Strategy)
      // ============================================
      boxShadow: {
        'subtle': '0 4px 12px rgba(132, 115, 84, 0.10)',
        'medium': '0 8px 24px rgba(132, 115, 84, 0.15)',
        'strong': '0 12px 32px rgba(132, 115, 84, 0.20)',
      },

      // ============================================
      // 🔤 TYPOGRAPHY
      // ============================================
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },

      // ============================================
      // 🎬 ANIMATIONS
      // ============================================
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },

      // ============================================
      // 📏 TRANSITIONS
      // ============================================
      transitionDuration: {
        'micro': '150ms',
        'normal': '300ms',
      },
    },
  },
  plugins: [],
}