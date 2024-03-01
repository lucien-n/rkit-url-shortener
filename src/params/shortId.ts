import type { ParamMatcher } from '@sveltejs/kit';
import { shortIdAlphabet } from '$shared/helpers/nanoid';

export const match: ParamMatcher = (param) => {
	return param.length === 6 && param.split('').every((char) => shortIdAlphabet.includes(char));
};
