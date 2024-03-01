import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import type { ShortUrl } from '$shared/modules/short-urls/short-url.entity';
import { getCachedShortUrl, cacheShortUrl } from '$lib/server/upstash/redis';
import { ShortUrlsController } from '$shared/modules/short-urls/short-urls.controller';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	let shortUrl: ShortUrl | null = null;

	const cachedShortUrl = await getCachedShortUrl(id);
	if (cachedShortUrl) {
		shortUrl = cachedShortUrl;
	} else {
		const dbShortUrl = await ShortUrlsController.findBy({ id });
		if (dbShortUrl) {
			shortUrl = dbShortUrl;
			await cacheShortUrl(dbShortUrl);
		}
	}

	if (shortUrl) {
		await ShortUrlsController.incrementViewCount(shortUrl.id);
		redirect(303, shortUrl.url);
	}

	error(404, 'URL not found');
};
