<script lang="ts">
	import { browser } from '$app/environment';
	import { cn } from '$lib/shadcn/utils';
	import type { Url } from '$remult/url/url.entity';
	import { Button } from '$shadcn/button';
	import { Link2 } from 'radix-icons-svelte';

	export let mostViewedUrls: Url[];

	const formatCount = (count: number) => {
		const formatter = Intl.NumberFormat('en', { notation: 'compact' });
		return formatter.format(count);
	};
</script>

<div>
	<p class="text-center text-lg font-bold">Most viewed urls</p>
	<div class="grid grid-cols-2 items-center gap-x-8">
		{#each mostViewedUrls as url, index (url.id)}
			<div class={cn('mx-auto flex items-center gap-1', index === 2 ? 'col-span-2 mx-auto' : '')}>
				{#if browser}
					{@const href = browser ? window.location.origin + '/' + url.tinyId : 'l'}
					<Button
						{href}
						variant="link"
						data-sveltekit-preload-data="off"
						class="mx-auto flex items-center gap-1 px-1"
					>
						<Link2 />
						{href}
					</Button>
					<p
						class="flex aspect-square h-5 items-center justify-center rounded bg-primary-foreground px-1 text-sm font-bold text-primary"
					>
						{formatCount(url.redirects)}
					</p>
				{:else}
					<Button
						variant="link"
						data-sveltekit-preload-data="off"
						class={cn('mx-auto flex items-center gap-1', index === 2 ? 'col-span-2 mx-auto' : '')}
					>
						<Link2 />
						<p class="h-3 w-52 animate-pulse rounded bg-primary/60" />
					</Button>
				{/if}
			</div>
		{/each}
	</div>
</div>
