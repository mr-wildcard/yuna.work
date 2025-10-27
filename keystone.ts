import { config, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { json, relationship } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export default config({
  db: {
    provider: "sqlite",
    url: `file:./database.db`,
  },
  lists: {
    testimonial: list({
      access: allowAll,
      fields: {
        content: document({ formatting: true }),
        author: document({ formatting: true }),
        context: document({ formatting: true }),
      },
    }),
    Collaboration: list({
      access: allowAll,
      fields: {
        testimonials: relationship({
          ref: "testimonial",
          many: true,
          ui: {
            labelField: "author",
            searchFields: ["author"],
          },
        }),
        intro_highlights: json({
          defaultValue: { title: "", items: [] },
          ui: {
            views: "./src/admin/fields/title-list-field",
          },
        }),
      },
    }),
  },
});
