import {
    RATELIMITING_DEFAULT_TOKENS,
    RATELIMITING_ENABLED,
    UPSTASH_REDIS_REST_TOKEN,
    UPSTASH_REDIS_REST_URL
} from '$env/static/private';
import type { NumericRange, RequestEvent } from '@sveltejs/kit';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
	url: UPSTASH_REDIS_REST_URL,
	token: UPSTASH_REDIS_REST_TOKEN
});

export const ratelimit = {
	default: new Ratelimit({
		redis,
		prefix: '@ratelimit/default',
		limiter: Ratelimit.slidingWindow(parseInt(RATELIMITING_DEFAULT_TOKENS ?? '3'), '60s')
	})
};

export const limit = async (
	event: RequestEvent,
	limiter: Ratelimit
): Promise<{ message: string; status: NumericRange<400, 599> } | undefined> => {
	if (RATELIMITING_ENABLED === 'false') return;

	const clientAddress = event.getClientAddress();
	const { success, reset } = await limiter.limit(clientAddress);

	if (!success) {
		const time_remaining = Math.ceil((reset - Date.now()) / 1000);
		return { message: `Rate limit exceeded, try again in ${time_remaining} seconds`, status: 409 };
	}
};
