import {
	writable,
	type Invalidator,
	type Subscriber,
	type Unsubscriber,
	type Updater
} from 'svelte/store';

type TitleStore<T = string> = {
	subscribe: (
		this: void,
		run: Subscriber<T>,
		invalidate?: Invalidator<T> | undefined
	) => Unsubscriber;
	set: (value: T, prefixed?: boolean) => void;
	update: (this: void, updater: Updater<T>) => void;
	setPrefix: (value: T) => T;
};

export const createTitleStore = (initialValue: string, prefix?: string): TitleStore => {
	const {
		subscribe,
		set: svelteSet,
		update
	} = writable((prefix ? prefix + ' ' : '') + initialValue);

	const setPrefix = (value: string) => (prefix = value);

	const set = (value: string, prefixed = true) => {
		svelteSet((prefixed && prefix ? prefix + ' ' : '') + value);
	};

	return {
		subscribe,
		set,
		update,
		setPrefix
	};
};

export const titleStore: TitleStore = createTitleStore('Shortener');
