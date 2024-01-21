export const copyToClipboard = (content: string, onSuccess?: () => void) => {
	navigator.clipboard.writeText(content).then(
		() => {
			onSuccess && onSuccess();
		},
		(err) => {
			console.error('Async: Could not copy text: ', err);
		}
	);
};
