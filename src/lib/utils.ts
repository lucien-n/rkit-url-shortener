export const copyToClipboard = (
	content: string,
	onSuccess: () => void = () => undefined,
	onError: () => void = () => undefined
) => {
	navigator.clipboard.writeText(content).then(onSuccess, onError);
};
