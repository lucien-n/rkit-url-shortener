import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$remult';
import { Url } from '$remult/url/url.entity';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: PRIVATE_DATABASE_URL }),
	initApi: async (remult) => {
		if (process.env.NODE_ENV !== 'PRODUCTION') {
			const urls = await remult.repo(Url).find({ include: { credentials: true } });
			console.table(urls);
		}
	},
	entities,
	controllers
});
