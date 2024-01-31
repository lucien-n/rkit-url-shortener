/**
 * Disables the button for a certain amnout of time after a certain amount of clicks
 */
export const cooldown = (button: HTMLButtonElement, { cooldown = 750, afterClicks = 0 } = {}) => {
	let lastClickedAt = 0;
	let clickedTimes = 0;
	let enableTimeout = -1;

	const handleClick = (event: MouseEvent) => {
		clickedTimes += 1;

		if (afterClicks === 0 && !button.disabled) {
			disable();
			return;
		}

		const now = new Date().getTime();
		if (now - lastClickedAt < cooldown && !button.disabled && clickedTimes >= afterClicks) {
			event.preventDefault();

			disable();
		} else {
			lastClickedAt = now;
		}
	};

	const disable = () => {
		button.disabled = true;
		enableTimeout = setTimeout(() => {
			enable();
			clickedTimes = 0;
		}, cooldown);
	};

	const enable = () => {
		button.disabled = false;
	};

	button.addEventListener('click', handleClick);

	return {
		destroy() {
			button.removeEventListener('click', handleClick);
			clearTimeout(enableTimeout);
		}
	};
};
