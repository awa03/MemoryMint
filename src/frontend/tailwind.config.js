/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" }
        }
      },
      animation: {
        wiggle_inf: "wiggle 1000ms ease-in-out infinite",
        wiggle: "wiggle 200ms ease-in-out infinite"
      },
      colors: {
        theme: {
          default: {
            background: '#ffffff',
            text: '#000000',
            primary: '#3b82f6',
            secondary: '#10b981'
          },
          dark: {
            background: '#121212',
            text: '#ffffff',
            primary: '#2563eb',
            secondary: '#059669'
          },
          light: {
            background: '#f3f4f6',
            text: '#1f2937',
            primary: '#4f46e5',
            secondary: '#16a34a'
          }
        }
      }
    },
  },
  plugins: [],
}
