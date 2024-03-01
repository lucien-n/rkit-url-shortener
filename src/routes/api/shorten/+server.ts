import { type RequestHandler } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { cacheShortUrl } from '$lib/server/upstash/redis';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { limit, shortUrlRatelimit } from '$lib/server/upstash/ratelimit';
import { ShortUrlsController } from '$shared/modules/short-urls/short-urls.controller';
import { createShortUrlSchema } from '$shared/modules/short-urls/schemas/create-short-url.schema';

export const POST: RequestHandler = async (event) => {
	const { request } = event;

	const form = await superValidate(request, zod(createShortUrlSchema));

	const rlError = await limit(event, shortUrlRatelimit);
	if (rlError) return actionResult('failure', { form, message: rlError.message }, rlError.status);

	if (!form.valid) return actionResult('failure', { form }, 400);

	const { url } = form.data;

	if (!url.startsWith('https://')) {
		return actionResult('failure', { message: 'Cannot shorten unsecure (http) urls', form }, 400);
	}

	const shortUrl = await ShortUrlsController.create({ url });
	await cacheShortUrl(shortUrl);

	return actionResult('success', { form, result: shortUrl });
};
