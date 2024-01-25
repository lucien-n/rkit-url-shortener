import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$remult';
import { ShortUrl } from '$remult/short-url/short-url.entity';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: PRIVATE_DATABASE_URL }),
	initApi: async (remult) => {
		if (process.env.NODE_ENV !== 'PRODUCTION') {
			const urls = await remult.repo(ShortUrl).find({ include: { credentials: true } });
			console.table(urls);
		}
	},
	entities,
	controllers
});
