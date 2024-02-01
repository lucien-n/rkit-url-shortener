import { cacheUrl } from '$lib/server/data';
import { limit, ratelimit } from '$lib/server/redis';
import { superFormAction } from '$lib/server/super-utils';
import { createShortUrlSchema } from '$remult/short-url/inputs/create-short-url-input';
import { ShortUrlsController } from '$remult/short-url/short-url.controller';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(createShortUrlSchema)
	};
};

export const actions: Actions = {
	default: (event) =>
		superFormAction(event, createShortUrlSchema, async (form) => {
			const { url, expiration } = form.data;

			const error = await limit(event, ratelimit.default);
			if (error) throw message(form, error.message, { status: error.status });

			const shortenedUrl = await ShortUrlsController.create({ url, expiration });
			await cacheUrl(shortenedUrl);

			return {
				shortenedUrl: { ...shortenedUrl }
			};
		})
};
