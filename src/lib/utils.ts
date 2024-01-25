export const copyToClipboard = (
	content: string,
	onSuccess: (message: string, value: unknown) => void = () => undefined,
	onError: (message: string, reason: string) => void = () => undefined
) => {
	navigator.clipboard.writeText(content).then(
		(value) => onSuccess(`Successfully copied "${content}" to your clipboard`, value),
		(reason) => onError(`Error while copying "${content}" to your clipboard`, reason)
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

export const stripProtocol = (url: string) => url.replace(/^(https?:\/\/)/, '');
