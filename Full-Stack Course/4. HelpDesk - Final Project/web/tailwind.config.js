import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...fontFamily.sans],
      },
      colors: {
        blue: {
          dark: "#2E3DA3",
          base: "#5165E1",
          light: "#8996EB",
        },
        gray: {
          100: "#151619",
          200: "#1E2024",
          300: "#535964",
          400: "#858B99",
          500: "#E3E5E8",
          600: "#F9FAFA",
        },
        feedback: {
          danger: "#D03E3E",
          open: "#CC3D6A",
          progress: "#355EC5",
          done: "#508B26",
        },
      },
      fontSize: {
        "xl": ["24px", { lineHeight: "140%", fontWeight: "700" }],
        "lg": ["20px", { lineHeight: "140%", fontWeight: "700" }],
        "md": ["16px", { lineHeight: "140%", fontWeight: "400" }],
        "sm": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "xs": ["12px", { lineHeight: "140%", fontWeight: "400" }],
        "xxs": ["10px", { lineHeight: "140%", fontWeight: "700", textTransform: "uppercase" }],
      },
    },
  },
  plugins: [],
}

