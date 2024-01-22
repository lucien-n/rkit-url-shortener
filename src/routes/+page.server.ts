import { superFormAction } from '$lib/server/super-utils';
import { createUrlSchema } from '$remult/url/inputs/create-url-input';
import { UrlsController } from '$remult/url/url.controller';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(createUrlSchema),
		mostViewedUrls: await UrlsController.getMostViewed(3)
	};
};

export const actions: Actions = {
	default: (event) =>
		superFormAction(event, createUrlSchema, async (form) => {
			const { url } = form.data;

			const shortenedUrl = await UrlsController.create({ url });

			return {
				shortenedUrl: event.url.origin + '/' + shortenedUrl.tinyId
			};
		})
};
