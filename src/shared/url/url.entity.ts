import { Entity, Fields } from 'remult';
import { Expiration } from './enums/expiration.enum';

@Entity<Url>('urls')
export class Url {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	url!: string;

	@Fields.string()
	tinyId!: string;

	@Fields.number()
	redirects: number = 0;

	@Fields.object()
	expiration: Expiration = Expiration.OneMonth;

	@Fields.createdAt()
	createdAt!: Date;
}
