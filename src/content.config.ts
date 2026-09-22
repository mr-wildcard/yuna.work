import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    tags: z.array(z.string()),
    isOngoing: z.boolean().optional(),
    testimonials: z
      .array(
        z.object({
          quote: z.string(),
          author: z.string(),
          lang: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = { projects };
