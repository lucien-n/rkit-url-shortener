import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { createShortUrlSchema } from '$shared/modules/short-urls/schemas/create-short-url.schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(createShortUrlSchema))
	};
};
