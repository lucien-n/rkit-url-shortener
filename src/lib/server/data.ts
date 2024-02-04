import { REDIS_EXPIRATION_MOST_VIEWED_URLS, REDIS_EXPIRATION_SINGLE_URL } from '$env/static/private';
import { ShortUrlsController } from '$remult/short-url/short-url.controller';
import type { ShortUrl } from '$remult/short-url/short-url.entity';
import { redis } from './redis';

const REDIS_URL_KEY = 'url';
export const CACHE_EXPIRATIONS = {
	singleUrl: parseInt(REDIS_EXPIRATION_SINGLE_URL ?? '600'),
	mostViewedUrls: parseInt(REDIS_EXPIRATION_MOST_VIEWED_URLS ?? '900')
};

const getUrlFromCache = async (id: string) => {
	const cached = await redis.get<ShortUrl>(`${REDIS_URL_KEY}:${id}`);
	if (cached) {
		return cached;
	}

	return null;
};

export const getUrl = async (id: string, bypassCache = false) => {
	if (!bypassCache) {
		const chached = await getUrlFromCache(id);
		if (chached) return chached;
	}

	const url = await ShortUrlsController.findById(id);
	return url;
};

const getUrlsFromCache = async (ids: string[]) => {
	const urls: ShortUrl[] = [];
	for (const id of ids) {
		const cached = await redis.get<ShortUrl>(`${REDIS_URL_KEY}:${id}`);
		if (cached) {
			urls.push(cached);
		}
	}

	return urls;
};

export const getUrls = async (ids: string[], bypassCache = false) => {
	if (ids.length > 20) throw Error('Too many (20 >= ids)');

	const urls: ShortUrl[] = [];
	let remainingIds = ids;

	if (!bypassCache) {
		const cached = await getUrlsFromCache(remainingIds);
		for (const cachedUrl of cached) {
			if (cachedUrl) urls.push(cachedUrl);
		}
		remainingIds = remainingIds.filter((id) => !urls.some(({ id: urlId }) => id === urlId));
	}

	const dbUrls = await ShortUrlsController.findByIds(remainingIds);
	return urls.concat(dbUrls);
};

export const cacheUrl = async (url: ShortUrl, ex = CACHE_EXPIRATIONS.singleUrl) => {
	const redisKey = `${REDIS_URL_KEY}:${url.id}`;
	await redis.set(redisKey, url, { ex });
};

export const cacheUrls = async (urls: ShortUrl[]) => {
	if (urls.length > 20) throw Error('Too many urls (20 >= urls)');

	for (const url of urls) {
		await cacheUrl(url, CACHE_EXPIRATIONS.mostViewedUrls);
	}
};


export const getMostViewedUrls = async () => {
	const cached = await redis.get<ShortUrl[]>('mostViewedUrls');
	if (cached) {
		return cached;
	}

	const mostViewedUrls = await ShortUrlsController.getMostViewed(3);
	await redis.set('mostViewedUrls', mostViewedUrls, {
		ex: CACHE_EXPIRATIONS.mostViewedUrls
	});

	return mostViewedUrls;
};
