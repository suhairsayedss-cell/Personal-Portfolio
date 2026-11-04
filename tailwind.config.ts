import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f7f1ed",
        ink: "#242424",
        yellow: "#ffe862",
        "yellow-deep": "#ffd640",
        frame: "#acacac",
        muted: "#636363",
        inactive: "#c8c3bf",
        signature: "#e8763a",
      },
      fontFamily: {
        display: ["var(--font-display)", "Archivo", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        brief: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
