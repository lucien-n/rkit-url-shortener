import { cacheUrl } from '$lib/server/data';
import { redis } from '$lib/server/redis';
import { superFormAction } from '$lib/server/super-utils';
import { createShortUrlSchema } from '$remult/short-url/inputs/create-short-url-input';
import { ShortUrlsController } from '$remult/short-url/short-url.controller';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

const getMostViewedUrls = async () => {
	const cached = await redis.get('mostViewedUrls');
	if (cached) {
		return JSON.parse(cached);
	}

	const mostViewedUrls = await ShortUrlsController.getMostViewed(3);
	await redis.set('mostViewedUrls', JSON.stringify(mostViewedUrls), 'EX', 900);

	return mostViewedUrls;
};

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(createShortUrlSchema),
		mostViewedUrls: await getMostViewedUrls()
	};
};

export const actions: Actions = {
	default: (event) =>
		superFormAction(event, createShortUrlSchema, async (form) => {
			const { url, expiration } = form.data;

			const shortenedUrl = await ShortUrlsController.create({ url, expiration });

			await cacheUrl(shortenedUrl);

			return {
				shortenedUrl: { ...shortenedUrl }
			};
		})
};
