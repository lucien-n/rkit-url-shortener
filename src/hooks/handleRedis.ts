import { PRIVATE_REDIS_URL } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { createClient } from 'redis';

export const handleRedis: Handle = async ({ event, resolve }) => {
	event.locals.redis = createClient({
		url: PRIVATE_REDIS_URL
	});
	await event.locals.redis.connect();

	return resolve(event);
};
