import { PRIVATE_REDIS_URL } from '$env/static/private';
import type { Url } from '$remult/url/url.entity';
import Redis from 'ioredis';

export const redis = new Redis(PRIVATE_REDIS_URL);

export const getUrlFromCache = async (tinyId: string) => {
	const redisKey = `url:${tinyId}`;
	const cached = await redis.get(redisKey);

	if (cached) {
		return JSON.parse(cached);
	}
};

export const cacheUrl = async (url: Url) => {
	const redisKey = `url:${url.tinyId}`;
	await redis.set(redisKey, JSON.stringify(url), 'EX', 600);
};
