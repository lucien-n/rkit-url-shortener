export const copyToClipboard = (
	content: string,
	onSuccess: () => void = () => undefined,
	onError: () => void = () => undefined
) => {
	navigator.clipboard.writeText(content).then(onSuccess, onError);
};

export const addUrlIdToLocalStorage = (id: string, key = 'urls') => {
	const urlsIds = getUrlsIdsFromLocalStorage(key);
	const urlsToStore = [...urlsIds, id];
	const stringified = JSON.stringify(urlsToStore);
	localStorage.setItem(key, stringified);

	return urlsToStore;
};

export const getUrlsIdsFromLocalStorage = (key = 'urls') => {
	const idsFromLocalStorage = localStorage.getItem(key);
	if (!idsFromLocalStorage) return [];

	const parsed = JSON.parse(idsFromLocalStorage) as Array<string>;

	const validUrls = parsed.filter((id) => id.length === 6);
	return validUrls;
};
