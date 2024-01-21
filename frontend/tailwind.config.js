/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        base: {
          primary: "#F231A5",
          secondary: "#3CD3C1",
          darkPrimary: "#DA0D89",
          darkSecondary: "#27B0A0",
          mainBg: "#06092B",
          lightBg: "#F2F2F2",
          lightGray: "#EAEAEA",
          gray: "#8F8F8F",
          darkGray: "#2E2F42",
          red: "#FF6347"
        },
        white: "#FAFAFA",
        black: "#030517",
        transparent: "transparent"
      }
    }
  },
  plugins: []
};
