import { z } from 'zod';
import { getZString } from '../../helpers/zod';
import { Expiration } from '../enums/expiration.enum';
import rules from '../url.rules';

export const createUrlSchema = z.object({
	url: getZString('url', rules.url).url(),
	expiration: z.nativeEnum(Expiration).default(Expiration.OneMonth)
});

export type CreateUrlSchema = typeof createUrlSchema;

export type CreateUrlInput = z.infer<CreateUrlSchema>;
