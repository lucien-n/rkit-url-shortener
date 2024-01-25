<script lang="ts">
	import { browser } from '$app/environment';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { Button } from '$shadcn/button';
	import { Link2 } from 'radix-icons-svelte';

	export let url: ShortUrl;

	const formatCount = (count: number) => {
		const formatter = Intl.NumberFormat('en', { notation: 'compact' });
		return formatter.format(count);
	};
</script>

{#if browser}
	{@const origin = browser ? window.location.origin + '/' : ''}
	{@const href = origin ? origin + url.id : 'error'}
	<Button
		{href}
		variant="link"
		data-sveltekit-preload-data="off"
		class="mx-auto flex items-center gap-1 px-1"
	>
		<Link2 />
		<p>{origin}<strong>{url.id}</strong></p>
	</Button>
	<p
		class="flex aspect-square h-5 items-center justify-center rounded bg-primary-foreground px-1 text-sm font-bold text-primary"
	>
		{formatCount(url.redirects)}
	</p>
{:else}
	<Button variant="link" data-sveltekit-preload-data="off" class="mx-auto flex items-center gap-1">
		<Link2 />
		<p class="h-3 w-52 animate-pulse rounded bg-primary/60" />
	</Button>
{/if}
