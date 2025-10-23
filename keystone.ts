import { config, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { json } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export default config({
  db: {
    provider: "sqlite",
    url: `file:./database.db`,
  },
  lists: {
    CollaborationsPage: list({
      isSingleton: true,
      access: allowAll,
      fields: {
        intro_paragraphe1: document({
          formatting: true,
        }),
        intro_paragraphe2: document({
          formatting: true,
        }),
      },
    }),
  },
});
