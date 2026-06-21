import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const ranking = defineCollection({
  loader: file('src/data/ranking.json'),
  schema: ({ image }) =>
    z.object({
      rank: z.number(),
      name: z.string(),
      description: z.string(),
      subItems: z.array(z.string()).optional(),
      price: z.string(),
      href: z.string(),
      image: image(),
    }),
});

const brandCards = defineCollection({
  loader: file('src/data/brand-cards.json'),
  schema: ({ image }) =>
    z.object({
      reason: z.string(),
      title: z.string(),
      description: z.string(),
      cta: z.string().nullable(),
      ctaHref: z.string().nullable().default(null),
      href: z.string().nullable().default(null),
      image: image(),
      imageAlt: z.string(),
    }),
});

const priceBands = defineCollection({
  loader: file('src/data/price-bands.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    labelEn: z.string(),
    arch: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        description: z.string(),
        href: z.string(),
      })
    ),
  }),
});

export const collections = { ranking, brandCards, priceBands };
