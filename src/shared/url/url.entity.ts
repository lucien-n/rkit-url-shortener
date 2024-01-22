import { Entity, Fields } from 'remult';

@Entity<Url>('urls', { id: { id: true } })
export class Url {
	@Fields.string()
	id!: string;

	@Fields.string()
	url!: string;

	@Fields.number()
	redirects: number = 0;

	@Fields.date()
	expiratesAt!: Date;

	@Fields.createdAt()
	createdAt!: Date;
}
