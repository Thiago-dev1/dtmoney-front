/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      screens: {
        "test": {"max": "525px"}
        }
    },
  },
  plugins: [],
}