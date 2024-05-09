import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
      },
    },
    fontFamily: {
      sans: ["DM Sans Variable", "sans-serif"],
      arial: ["Arial", "sans-serif"],
    },
    fontSize: {
      "display-large-highlight": [
        "36px",
        {
          lineHeight: "120%",
          fontWeight: "500",
        },
      ],
      "display-large": [
        "36px",
        {
          lineHeight: "120%",
          fontWeight: "400",
        },
      ],
      "display-medium": [
        "32px",
        {
          lineHeight: "120%",
          fontWeight: "400",
        },
      ],
      "display-small": [
        "30px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "headline-small": [
        "24px",
        {
          lineHeight: "120%",
          fontWeight: "400",
        },
      ],
      "headline-small-highlight": [
        "22px",
        {
          lineHeight: "120%",
          fontWeight: "700",
        },
      ],
      "headline-large": [
        "26px",
        {
          lineHeight: "120%",
          fontWeight: "400",
        },
      ],
      "headline-large-highlight": [
        "24px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "title-small": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "title-normal": [
        "20px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "title-large": [
        "20px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "body-small": [
        "15px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "body-normal": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "body-normal-highlight": [
        "18px",
        {
          lineHeight: "160%",
          fontWeight: "500",
        },
      ],
      "tag-label-highlight": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "tag-label": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "menu-label-highlight": [
        "18px",
        {
          lineHeight: "normal",
          fontWeight: "700",
        },
      ],
      "menu-label": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
    },
    colors: {
      primary: "#0f2e20",
      paragraph: "#05100b",
      secondary: "#3d4c5e",
      neutral1: "#fefaf5",
      neutral2: "#f4efea",
      neutral3: "#d9e1dd",
      neutral4: "#b7c5be",
    },
  },
  plugins: [],
} satisfies Config;
