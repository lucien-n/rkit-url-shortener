import { Entity, Fields } from 'remult';

@Entity<ShortUrl>('short_urls', { id: { id: true }, allowApiCrud: false })
export class ShortUrl {
	@Fields.string()
	id!: string;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.integer()
	viewCount: number = 0;

	@Fields.string()
	url!: string;
}
