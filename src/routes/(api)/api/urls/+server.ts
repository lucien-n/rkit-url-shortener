import { getUrls } from '$lib/server/data';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const urlIds = url.searchParams.get('ids');
	if (!urlIds) throw new Response(null, { status: 422, statusText: 'Missing paramater "ids"' });

	const parsedIds = JSON.parse(urlIds) as Array<string>;
	const validIds = parsedIds.filter((id) => id.length === 6);

	const urls = await getUrls(validIds);
	const stringifiedUrls = JSON.stringify(urls);

	return new Response(stringifiedUrls);
};