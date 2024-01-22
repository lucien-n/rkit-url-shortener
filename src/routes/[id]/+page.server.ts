import { UrlsController } from '$remult/url/url.controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const url = await UrlsController.findByTinyId(id);

	if (!url) redirect(303, '/');

	redirect(308, url.url);
};
