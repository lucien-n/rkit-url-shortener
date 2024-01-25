import { generateId, parseZInputs } from '$remult/helpers';
import { getExpiresAt as getExpiration } from '$remult/helpers/url';
import { BackendMethod, Controller, remult } from 'remult';
import { createUrlSchema, type CreateUrlInput } from './inputs/create-url-input';
import { Url } from './url.entity';

@Controller('UrlsController')
export class UrlsController {
	constructor() {}

	@BackendMethod({ allowed: false })
	static findById(id: string) {
		return remult.repo(Url).findFirst({ id });
	}

	@BackendMethod({ allowed: false })
	static findByIds(ids: string[]) {
		return remult.repo(Url).find({ where: { id: ids } });
	}

	@BackendMethod({ allowed: false })
	static findByUrl(url: string) {
		return remult.repo(Url).findFirst({ url });
	}

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateUrlInput) {
		const { url, expiration } = parseZInputs(inputs, createUrlSchema);

		const expiresAt = getExpiration(expiration);

		const existingUrl = await this.findByUrl(url);
		if (existingUrl) {
			if (existingUrl.expiresAt.getTime() < expiresAt.getTime()) {
				return remult.repo(Url).update(existingUrl.id, { expiresAt: expiresAt });
			}

			return existingUrl;
		}

		let id = generateId();
		while (await this.findById(id)) id = generateId();

		return remult.repo(Url).insert({ id, url, expiresAt: expiresAt });
	}

	@BackendMethod({ allowed: false })
	static async incrementViews(id: string) {
		const url = await this.findById(id);
		return remult.repo(Url).update(url.id, { redirects: url.redirects + 1 });
	}

	@BackendMethod({ allowed: false })
	static async getMostViewed(limit = 5) {
		return (await remult.repo(Url).find({ orderBy: { redirects: 'desc' }, limit })).map((url) => ({
			...url
		}));
	}
}
