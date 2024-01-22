import type { Url } from '$remult/url/url.entity';
import type { RedisClientType } from 'redis';

export const getUrlFromCache = async (redis: RedisClientType, tinyId: string) => {
	const redisKey = `url:${tinyId}`;
	const cached = await redis.get(redisKey);

	if (cached) {
		return JSON.parse(cached);
	}
};

export const cacheUrl = async (redis: RedisClientType, url: Url) => {
	const redisKey = `url:${url.tinyId}`;
	await redis.set(redisKey, JSON.stringify(url), { EX: 600 });
};
