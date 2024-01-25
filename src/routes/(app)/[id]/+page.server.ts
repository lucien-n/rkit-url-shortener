import { cacheUrl, getUrl } from '$lib/server/data';
import { ShortUrlsController } from '$remult/short-url/short-url.controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const url = await getUrl(id);
	if (url) {
		cacheUrl(url);
	}

	await ShortUrlsController.incrementViews(id);

	redirect(308, url.url);
};
