import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { loadEnv } from "vite";

const { ASTRO_DEV_SERVER_LOCAL_HOST, ASTRO_DEV_SERVER_LOCAL_PORT } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "", // to load all env variables
);

function getSiteURL() {
  if (process.env.CF_PAGES) {
    if (process.env.CF_PAGES_BRANCH === "master") {
      return "https://yuna.work/";
    } else {
      return process.env.CF_PAGES_URL;
    }
  } else {
    return `http://${ASTRO_DEV_SERVER_LOCAL_HOST}:${ASTRO_DEV_SERVER_LOCAL_PORT}/`;
  }
}

export default defineConfig({
  integrations: [
    icon(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    sitemap(),
  ],
  site: getSiteURL(),
  vite: {
    build: {
      // mainly for transpiling optional chaining for iOS 12
      target: "es2019",
    },
  },
  server: {
    host: ASTRO_DEV_SERVER_LOCAL_HOST,
    port: Number(ASTRO_DEV_SERVER_LOCAL_PORT),
  },
});
