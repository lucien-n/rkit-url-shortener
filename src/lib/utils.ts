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

export const stripProtocol = (url: string) => url.replace(/^(https?:\/\/)/, '');
