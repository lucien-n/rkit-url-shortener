import { generateId } from '$remult/helper';
import { parseZInputs } from '$remult/zod-helpers';
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
	static findByUrl(url: string) {
		return remult.repo(Url).findFirst({ url });
	}

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateUrlInput) {
		const { url, expiration } = parseZInputs(inputs, createUrlSchema);

		const existingUrl = await this.findByUrl(url);
		if (existingUrl) return existingUrl;

		let id = generateId();
		while (await this.findById(id)) id = generateId();

		const expiratesAt = new Date();
		expiratesAt.setUTCHours(new Date().getUTCDay() + expiration * 24);

		return remult.repo(Url).insert({ id, url, expiratesAt });
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
