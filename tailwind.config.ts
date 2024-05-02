import { type Config } from "tailwindcss";

const BASE = 18;
const rem = (px: number) => `${px / BASE}rem`;

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
      },
    },
    fontSize: {
      base: `${BASE}px`,
    },
    fontFamily: {
      sans: ["DM Sans Variable", "sans-serif"],
      arial: ["Arial", "sans-serif"],
    },
  },
  plugins: [],
} satisfies Config;
