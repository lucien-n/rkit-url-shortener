import { generateId } from '$remult/helper';
import { parseZInputs } from '$remult/zod-helpers';
import { BackendMethod, Controller, remult } from 'remult';
import { createUrlSchema, type CreateUrlInput } from './inputs/create-url-input';
import { Url } from './url.entity';

@Controller('UrlsController')
export class UrlsController {
	constructor() {}

	@BackendMethod({ allowed: false })
	static findByTinyId(tinyId: string) {
		return remult.repo(Url).findFirst({ tinyId });
	}

	@BackendMethod({ allowed: false })
	static findByUrl(url: string) {
		return remult.repo(Url).findFirst({ url });
	}

	@BackendMethod({ allowed: false })
	static async create(inputs: CreateUrlInput) {
		const { url } = parseZInputs(inputs, createUrlSchema);

		const existingUrl = await this.findByUrl(url);
		if (existingUrl) return existingUrl;

		let tinyId = generateId();
		while (await this.findByTinyId(tinyId)) tinyId = generateId();

		return remult.repo(Url).insert({ url, tinyId });
	}

	@BackendMethod({ allowed: false })
	static async incrementViews(tinyId: string) {
		const url = await this.findByTinyId(tinyId);
		return remult.repo(Url).update(url.id, { redirects: url.redirects + 1 });
	}

	@BackendMethod({ allowed: false })
	static async getMostViewed(limit = 5) {
		return (await remult.repo(Url).find({ orderBy: { redirects: 'desc' }, limit })).map((url) => ({
			...url
		}));
	}
}
