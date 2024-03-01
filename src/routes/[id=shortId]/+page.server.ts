import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { ShortUrlsController } from '$shared/modules/short-urls/short-urls.controller';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const shortUrl = await ShortUrlsController.findBy({ id });

	if (shortUrl) {
		await ShortUrlsController.incrementViewCount(shortUrl.id);
		redirect(303, shortUrl.url);
	}

	error(404, 'URL not found');
};
