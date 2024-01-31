import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$remult';
import { ShortUrl } from '$remult/short-url/short-url.entity';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultSveltekit } from 'remult/remult-sveltekit';

const connectionString = new URL(DATABASE_URL);
connectionString.searchParams.set('sslmode', 'require');

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: connectionString.toString() }),
	initApi: async (remult) => {
		if (dev) {
			const urls = await remult.repo(ShortUrl).find({ include: { credentials: true } });
			console.table(urls);
		}
	},
	logApiEndPoints: dev,
	defaultGetLimit: 20,
	entities,
	controllers
});
