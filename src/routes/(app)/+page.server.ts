import { cacheUrl } from '$lib/server/data';
import { limit, ratelimit, redis } from '$lib/server/redis';
import { superFormAction } from '$lib/server/super-utils';
import { createShortUrlSchema } from '$remult/short-url/inputs/create-short-url-input';
import { ShortUrlsController } from '$remult/short-url/short-url.controller';
import type { ShortUrl } from '$remult/short-url/short-url.entity';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

const getMostViewedUrls = async () => {
	const cached = await redis.get<ShortUrl[]>('mostViewedUrls');
	if (cached) {
		return cached;
	}

	const mostViewedUrls = await ShortUrlsController.getMostViewed(3);
	await redis.set('mostViewedUrls', mostViewedUrls, { ex: 900 });

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

			const error = await limit(event, ratelimit.default);
			if (error) throw message(form, error.message, { status: error.status });

			const shortenedUrl = await ShortUrlsController.create({ url, expiration });
			await cacheUrl(shortenedUrl);

			return {
				shortenedUrl: { ...shortenedUrl }
			};
		})
};
