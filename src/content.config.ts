import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const collaborations = defineCollection({
  loader: glob({ pattern: "collaborations.yml", base: "./src/content/pages" }),
  schema: ({ image }) =>
    z.object({
      intro: z.object({
        title: z.string(),
        text: z.string(),
      }),
      missions: z.object({
        title: z.string(),
        items: z.array(z.string()),
      }),
      clients: z.array(
        z.object({
          logo: image(),
          name: z.string(),
          width: z.number(),
          widthLg: z.number().optional(),
        })
      ),
      projectsSection: z.object({
        title: z.string(),
        text: z.string(),
      }),
      projects: z.array(
        z.object({
          title: z.string(),
          cover: image(),
          tags: z.array(z.string()),
          isOngoing: z.boolean().optional(),
          testimonials: z
            .array(
              z.object({
                quote: z.string(),
                author: z.string(),
                lang: z.enum(["fr", "en"]).optional(),
              })
            )
            .optional(),
        })
      ),
    }),
});

export const collections = { collaborations };
