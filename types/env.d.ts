interface ImportMetaEnv {
  readonly ASTRO_DEV_SERVER_LOCAL_PORT: number;
  readonly ASTRO_DEV_SERVER_LOCAL_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
  }
}
