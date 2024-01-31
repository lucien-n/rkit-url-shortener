import {
	PRIVATE_ENABLE_RATE_LIMITING,
	PRIVATE_UPSTASH_REDIS_REST_TOKEN
} from '$env/static/private';
import { PUBLIC_UPSTASH_REDIS_REST_URL } from '$env/static/public';
import type { RequestEvent } from '@sveltejs/kit';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
	url: PUBLIC_UPSTASH_REDIS_REST_URL,
	token: PRIVATE_UPSTASH_REDIS_REST_TOKEN
});

export const ratelimit = {
	default: new Ratelimit({
		redis,
		prefix: '@ratelimit/default',
		limiter: Ratelimit.slidingWindow(3, '60s')
	})
};

export const limit = async (event: RequestEvent, limiter: Ratelimit) => {
	if (PRIVATE_ENABLE_RATE_LIMITING === 'false') return { error: null };

	const clientAddress = event.getClientAddress();
	const { success, reset } = await limiter.limit(clientAddress);

	if (!success) {
		const time_remaining = Math.floor((reset - Date.now()) / 1000);
		return { error: `Rate limit exceeded, try again in ${time_remaining} seconds` };
	}

	return { error: null };
};
