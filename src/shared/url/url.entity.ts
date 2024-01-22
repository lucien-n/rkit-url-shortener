import { Entity, Fields } from 'remult';

@Entity<Url>('urls')
export class Url {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	url!: string;

	@Fields.string()
	tinyId!: string;

	@Fields.createdAt()
	createdAt!: Date;
}
