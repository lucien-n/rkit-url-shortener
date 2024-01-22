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
		const { url } = parseZInputs(inputs, createUrlSchema);

		const existingUrl = await this.findByUrl(url);
		if (existingUrl) return existingUrl;

		let tinyId = generateId();
		while (await this.findById(tinyId)) tinyId = generateId();

		return remult.repo(Url).insert({ url, tinyId });
	}
}
