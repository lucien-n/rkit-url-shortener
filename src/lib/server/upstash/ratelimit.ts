import { redis } from './redis';
import type { NumericRange, RequestEvent } from '@sveltejs/kit';
import { RL_ENABLED, RL_SHORTURLS_TOKENS } from '$env/static/private';
import { Ratelimit } from '@upstash/ratelimit'; // for deno: see above

const shortUrlTokens = parseInt(RL_SHORTURLS_TOKENS ?? '3') ?? 3;
const rlEnabled = RL_ENABLED !== 'false';

export const shortUrlRatelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(shortUrlTokens, '15s'),
	prefix: '@upstash/ratelimit'
});

export const limit = async (
	event: RequestEvent,
	limiter: Ratelimit
): Promise<{ message: string; status: NumericRange<400, 599> } | undefined> => {
	if (!rlEnabled) return;

	const clientAddress = event.getClientAddress();
	const { success, reset } = await limiter.limit(clientAddress);

	if (!success) {
		const time_remaining = Math.ceil((reset - Date.now()) / 1000);
		return { message: `Rate limit exceeded, try again in ${time_remaining} seconds`, status: 429 };
	}
};
