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
      }
    },
  },
  plugins: [],
}


