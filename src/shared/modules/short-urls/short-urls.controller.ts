import { ShortUrl } from './short-url.entity';
import { nanoid } from '$shared/helpers/nanoid';
import { parseZSchema } from '$shared/helpers/zod';
import { BackendMethod, remult, type EntityFilter } from 'remult';
import { createShortUrlSchema, type CreateShortUrlInput } from './schemas/create-short-url.schema';

export class ShortUrlsController {
	private static readonly repo = remult.repo(ShortUrl);

	@BackendMethod({ allowed: false, apiPrefix: 'short-urls' })
	static async findBy(where: EntityFilter<ShortUrl>): Promise<ShortUrl | undefined> {
		const shortUrl = this.repo.findOne({ where });
		return this.repo.toJson(shortUrl);
	}

	@BackendMethod({ allowed: false, apiPrefix: 'short-urls' })
	static async create(input: CreateShortUrlInput) {
		const parsed = parseZSchema(input, createShortUrlSchema);
		const url = parsed.url.toLowerCase();

		const existingShortUrl = await this.findBy({ url });
		if (existingShortUrl) return existingShortUrl;

		const id = nanoid();
		const shortUrl = this.repo.insert({ id, url });

		return this.repo.toJson(shortUrl);
	}

	@BackendMethod({ allowed: false, apiPrefix: 'short-urls' })
	static async incrementViewCount(id: string) {
		const shortUrl = await this.findBy({ id });
		if (!shortUrl) throw new Error('Resource not found');

		const updatedShortUrl = this.repo.update(shortUrl, { viewCount: shortUrl.viewCount + 1 });
		return this.repo.toJson(updatedShortUrl);
	}
}
