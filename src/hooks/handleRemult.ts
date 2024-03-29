import type { Handle } from '@sveltejs/kit';
import { controllers, entities } from '$shared';
import { POSTGRES_URL } from '$env/static/private';
import { remultSveltekit } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';

export const handleRemult: Handle = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: POSTGRES_URL }),
	entities,
	controllers
});
