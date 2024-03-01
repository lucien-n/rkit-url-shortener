import { z, type ZodType } from 'zod';

export const parseZSchema = <Schema extends ZodType>(inputs: z.infer<Schema>, schema: Schema) => {
	const result = schema.safeParse(inputs);
	if (!result.success) {
		throw result.error.issues;
	}

	return result.data as z.infer<Schema>;
};
