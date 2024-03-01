import { customAlphabet } from 'nanoid';

export const shortIdAlphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const nanoid = customAlphabet(shortIdAlphabet, 6);
