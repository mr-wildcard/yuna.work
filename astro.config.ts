import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import yaml from "@rollup/plugin-yaml";
import { loadEnv } from "vite";

const { ASTRO_DEV_SERVER_LOCAL_HOST, ASTRO_DEV_SERVER_LOCAL_PORT } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "", // to load all env variables
);

function getSiteURL() {
  if (process.env.CF_PAGES) {
    if (process.env.CF_PAGES_BRANCH === "main") {
      console.warn(
        "You need to configure the production URL in astro config file",
      );
    } else {
      console.warn(
        "You need to configure the Cloudlfare Pages URL in astro config file using pattern `https://${process.env.CF_PAGES_BRANCH}.DOMAIN.pages.dev/`",
      );
    }
  } else if (process.env.GITHUB_ACTION) {
    console.warn(
      "You need to configure the production URL in case build is done within a Github Action",
    );
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
    plugins: [yaml()],
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
