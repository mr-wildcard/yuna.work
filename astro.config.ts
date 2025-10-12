import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { loadEnv } from "vite";

const { ASTRO_DEV_SERVER_LOCAL_HOST, ASTRO_DEV_SERVER_LOCAL_PORT } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "", // to load all env variables
);

function getSiteURL() {
  if (process.env.CF_PAGES_BRANCH === "master") {
    return "https://yuna.work/";
  } else if (process.env.CI === "true") {
    return `https://${process.env.GITHUB_HEAD_REF}.yuna-work.pages.dev/`;
  } else {
    return `http://${ASTRO_DEV_SERVER_LOCAL_HOST}:${ASTRO_DEV_SERVER_LOCAL_PORT}/`;
  }
}

export default defineConfig({
  integrations: [icon(), sitemap()],
  site: getSiteURL(),
  vite: {
    // @ts-expect-error Astro will probably support Vite 7 typings in a new major version later in 2025: https://github.com/withastro/astro/issues/14030#issuecomment-3027129338
    plugins: [tailwindcss()],
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
