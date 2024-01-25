import { Entity, Fields } from 'remult';

@Entity<ShortUrl>('short-urls', { id: { id: true } })
export class ShortUrl {
	@Fields.string()
	id!: string;

	@Fields.string()
	url!: string;

	@Fields.number()
	redirects: number = 0;

	@Fields.date()
	expiresAt!: Date;

	@Fields.createdAt()
	createdAt!: Date;
}
