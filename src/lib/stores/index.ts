export * from './';
import storage from './storage';

const urlIdRegex = /^[a-zA-Z0-9]{6}$/;

const createUrlsStore = (key: string, initValue: string[]) => {
	const { subscribe, set, update } = storage<string[]>(key, initValue);

	const validateUrls = (ids: string[]) => ids.filter((id) => urlIdRegex.test(id));

	const add = (ids: string[]) => {
		const validIds = validateUrls(ids);

		update((currentIds) => [...new Set([...currentIds, ...validIds])]);
	};

	const remove = (ids: string[]) => {
		const validIds = validateUrls(ids);
		update((currentIds) => currentIds.filter((id) => !validIds.includes(id)));
	};

	return {
		subscribe,
		set,
		update,
		add,
		remove
	};
};

export const favoritesStore = createUrlsStore('favorites', []);
export const urlsStore = createUrlsStore('urls', []);
