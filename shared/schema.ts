import { z } from "zod";

export const giveawaySchema = z.object({
  id: z.number(),
  title: z.string(),
  worth: z.string(),
  thumbnail: z.string(),
  image: z.string(),
  description: z.string(),
  instructions: z.string().optional(),
  open_giveaway_url: z.string().optional(),
  published_date: z.string(),
  type: z.string(),
  platforms: z.string(),
  end_date: z.string().nullable(),
  users: z.number(),
  status: z.string(),
  gamerpower_url: z.string(),
  open_giveaway: z.string().optional(),
});

export const giveawaysResponseSchema = z.array(giveawaySchema);

export type Giveaway = z.infer<typeof giveawaySchema>;
export type GiveawaysResponse = z.infer<typeof giveawaysResponseSchema>;

// Filter types
export const filterSchema = z.object({
  platform: z.string().optional(),
  type: z.string().optional(),
  sort: z.enum(['date', 'value', 'popularity']).optional(),
  search: z.string().optional(),
});

export type GiveawayFilters = z.infer<typeof filterSchema>;
