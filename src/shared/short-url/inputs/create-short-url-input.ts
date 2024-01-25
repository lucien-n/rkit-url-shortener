import { z } from 'zod';
import { getZString } from '../../helpers/zod';
import { Expiration } from '../enums/expiration.enum';
import rules from '../short-url.rules';

export const createShortUrlSchema = z.object({
	url: getZString('url', rules.url).url(),
	expiration: z.nativeEnum(Expiration).default(Expiration.OneMonth)
});

export type CreateShortUrlSchema = typeof createShortUrlSchema;

export type CreateShortUrlInput = z.infer<CreateShortUrlSchema>;
