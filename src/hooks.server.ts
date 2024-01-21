import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleRemult } from './hooks/handleRemult';

export const handle: Handle = sequence(handleRemult);
