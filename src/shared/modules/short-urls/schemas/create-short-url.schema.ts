import { z } from 'zod';

export const createShortUrlSchema = z.object({
	url: z.string().url()
});

export type CreateShortUrlSchema = typeof createShortUrlSchema;
export type CreateShortUrlInput = z.infer<CreateShortUrlSchema>;
