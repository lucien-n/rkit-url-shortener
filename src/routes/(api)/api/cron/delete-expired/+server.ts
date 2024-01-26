import { CRON_SECRET } from '$env/static/private';
import { ShortUrlsController } from '$remult/short-url/short-url.controller';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	if (request.headers.get('Authorization') !== `Bearer ${CRON_SECRET}`)
		return new Response(null, { status: 403 });

	await ShortUrlsController.deleteExpired();
	return new Response();
};
