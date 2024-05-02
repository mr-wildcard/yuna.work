import { type Config } from "tailwindcss";

const BASE = 18;
const rem = (px: number) => `${px / BASE}rem`;

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontSize: {
      base: `${BASE}px`,
      "body-small": [
        rem(15),
        {
          lineHeight: "140%",
          fontWeight: 400,
        },
      ],
      "body-normal": [
        rem(18),
        {
          lineHeight: "140%",
          fontWeight: 400,
        },
      ],
    },
  },
  plugins: [],
} satisfies Config;
