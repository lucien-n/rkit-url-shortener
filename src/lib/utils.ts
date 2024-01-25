export const copyToClipboard = (
	content: string,
	onSuccess: (message: string) => void = () => undefined,
	onError: (message: string) => void = () => undefined
) => {
	navigator.clipboard.writeText(content).then(
		() => onSuccess(`Successfully copied "${content}" to your clipboard`),
		() => onError(`Error while copying "${content}" to your clipboard`)
	);
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
