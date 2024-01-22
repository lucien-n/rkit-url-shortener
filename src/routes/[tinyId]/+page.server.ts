import { cacheUrl, getUrlFromCache } from '$lib/server/redis';
import { UrlsController } from '$remult/url/url.controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { redis } }) => {
	const { tinyId } = params;

	let url = await getUrlFromCache(redis, tinyId);
	if (!url) {
		url = await UrlsController.findByTinyId(tinyId);
		if (!url) redirect(303, '/');

		cacheUrl(redis, url);
	}

	await UrlsController.incrementViews(tinyId);

	redirect(308, url.url);
};
