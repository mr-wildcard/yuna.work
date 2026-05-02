import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    title: z.string(),
    tags: z.array(z.string()),
    screenshotKey: z.string(),
    isOngoing: z.boolean().optional(),
    testimonials: z
      .array(
        z.object({
          quote: z.string(),
          author: z.string(),
          lang: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = { projects };
