import { config, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

export default config({
  db: {
    provider: "postgresql",
    url: "",
  },
  lists: {
    User: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      },
    }),
  },
});
