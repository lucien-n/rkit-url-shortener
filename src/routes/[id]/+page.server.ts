import { cacheUrl, getUrlFromCache } from '$lib/server/redis';
import { UrlsController } from '$remult/url/url.controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	let url = await getUrlFromCache(id);
	if (!url) {
		url = await UrlsController.findById(id);
		if (!url) redirect(303, '/');

		cacheUrl(url);
	}

	await UrlsController.incrementViews(id);

	redirect(308, url.url);
};
