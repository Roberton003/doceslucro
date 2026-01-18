/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ============================================
      // 🎨 COLOR PALETTE (DocesGIamor Gourmet - Bakery Inspired)
      // ============================================
      colors: {
        doce: {
          primary: '#d4a574',     // Bege gourmet - CTAs, accent
          secondary: '#f5e6d3',   // Creme claro - backgrounds
          accent: '#8b7355',      // Marrom quente - headers
          terracotta: '#d4703f',  // NEW: Terracotta from Bakery UI
          success: '#a4d65e',     // Verde-menta - confirmations
          dark: '#1a1410',        // Texto escuro (darker)
          light: '#6d6d6d',       // Texto secundário
          border: '#e8dcc8',      // Bordas suaves
          cream: '#faf6f1',       // Fundo cream mais claro
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
      // 🌑 SHADOWS (Enhanced - Bakery UI Inspired)
      // ============================================
      boxShadow: {
        'subtle': '0 4px 12px rgba(132, 115, 84, 0.10)',
        'medium': '0 8px 24px rgba(132, 115, 84, 0.15)',
        'strong': '0 12px 32px rgba(132, 115, 84, 0.20)',
        'card': '0 4px 20px rgba(26, 20, 16, 0.08)',         // NEW: Card shadow
        'card-hover': '0 12px 40px rgba(26, 20, 16, 0.15)',  // NEW: Card hover
        'glow': '0 0 30px rgba(212, 112, 63, 0.25)',         // NEW: Terracotta glow
      },

      // ============================================
      // 🔤 TYPOGRAPHY (Inspired by Bakery UI)
      // ============================================
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],  // Elegant serif for titles
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