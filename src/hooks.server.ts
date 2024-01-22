import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleRedis } from './hooks/handleRedis';
import { handleRemult } from './hooks/handleRemult';

export const handle: Handle = sequence(handleRedis, handleRemult);
