/****
 * Returns an expiration date
 * @param {number} expiration in days
 * @param {Date} from - expiration starts from
 *
 * @returns {Date} expiration date
 * */
export const getExpiresAt = (expiration: number, from = new Date()): Date => {
	const expiresAt = new Date();
	expiresAt.setUTCHours(from.getUTCDay() + expiration * 24);
	return expiresAt;
};
