export const getDaysBetweenDates = (a: Date, b: Date) => {
	const aMs = a.getTime();
	const bMs = b.getTime();

	const difference = bMs - aMs;

	return Math.ceil(difference / 1000 / 60 / 60 / 24);
};
