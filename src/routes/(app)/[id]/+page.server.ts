import { cacheUrl, getUrl } from '$lib/server/data';
import { UrlsController } from '$remult/url/url.controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const url = await getUrl(id);
	if (url) {
		cacheUrl(url);
	}

	await UrlsController.incrementViews(id);

	redirect(308, url.url);
};
