import { generateId, parseZInputs } from '$remult/helpers';
import { getExpiresAt as getExpiration } from '$remult/helpers/url';
import moment from 'moment';
import { BackendMethod, Controller, remult } from 'remult';
import { createShortUrlSchema, type CreateShortUrlInput } from './inputs/create-short-url-input';
import { ShortUrl } from './short-url.entity';

@Controller('ShortUrlsController')
export class ShortUrlsController {
	constructor() {}

	@BackendMethod({ allowed: false })
	static findById(id: string) {
		return remult.repo(ShortUrl).findFirst({ id });
	}

	@BackendMethod({ allowed: false })
	static findByIds(ids: string[]) {
		return remult.repo(ShortUrl).find({ where: { id: { $in: ids } } });
	}

	@BackendMethod({ allowed: false })
	static findByUrl(url: string) {
		return remult.repo(ShortUrl).findFirst({ url });
	}

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateShortUrlInput) {
		const { url, expiration } = parseZInputs(inputs, createShortUrlSchema);

		const expiresAt = getExpiration(expiration);

		const existingUrl = await this.findByUrl(url);
		if (existingUrl) {
			if (existingUrl.expiresAt.getTime() < expiresAt.getTime()) {
				return remult.repo(ShortUrl).update(existingUrl.id, { expiresAt: expiresAt });
			}

			return existingUrl;
		}

		let id = generateId();
		while (await this.findById(id)) id = generateId();

		return remult.repo(ShortUrl).insert({ id, url, expiresAt: expiresAt });
	}

	@BackendMethod({ allowed: false })
	static async incrementViews(id: string) {
		const url = await this.findById(id);
		return remult.repo(ShortUrl).update(url.id, { redirects: url.redirects + 1 });
	}

	@BackendMethod({ allowed: false })
	static async getMostViewed(limit = 5) {
		return (await remult.repo(ShortUrl).find({ orderBy: { redirects: 'desc' }, limit })).map(
			(url) => ({
				...url
			})
		);
	}

	@BackendMethod({ allowed: false })
	static async deleteExpired() {
		for await (const url of remult
			.repo(ShortUrl)
			.query({ where: { expiresAt: { $gte: new Date() } } })) {
			console.log(`Deleting "${url.id}" because it expired ${moment(url.expiresAt).fromNow()}`);
			remult.repo(ShortUrl).delete(url);
		}
	}
}
