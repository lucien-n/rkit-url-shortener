import { Redis } from '@upstash/redis';
import { match } from '../../../params/shortId';
import type { ShortUrl } from '$shared/modules/short-urls/short-url.entity';
import { KV_REST_API_TOKEN, KV_REST_API_URL, SHORTURL_EXPIRATION } from '$env/static/private';

export const redis = new Redis({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN
});

const shortUrlKey = 'shorturl';
const shortUrlExpiration = parseInt(SHORTURL_EXPIRATION ?? '600') ?? 600;

export const getCachedShortUrl = async (id: string): Promise<ShortUrl | undefined> => {
	if (!match(id)) return;

	const data = (await redis.get(`${shortUrlKey}:${id}`)) as ShortUrl | undefined;

	return data;
};

export const cacheShortUrl = async (shortUrl: ShortUrl) => {
	await redis.set(`${shortUrlKey}:${shortUrl.id}`, shortUrl, { ex: shortUrlExpiration });
};
