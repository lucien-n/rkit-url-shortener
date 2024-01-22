import { z } from 'zod';
import { getZString } from '../../zod-helpers';
import rules from '../url.rules';

export const createUrlSchema = z.object({
	url: getZString('url', rules.url).url()
});

export type CreateUrlSchema = typeof createUrlSchema;

export type CreateUrlInput = z.infer<CreateUrlSchema>;
