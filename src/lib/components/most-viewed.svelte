<script lang="ts">
	import { browser } from '$app/environment';
	import { cn } from '$lib/shadcn/utils';
	import type { Url } from '$remult/url/url.entity';
	import { Button } from '$shadcn/button';
	import { Link2 } from 'radix-icons-svelte';

	export let mostViewedUrls: Url[];
</script>

<div class="text-center text-lg font-bold">
	<p>Most viewed urls</p>
	<div class="grid grid-cols-2 items-center">
		{#each mostViewedUrls as url, index (url.id)}
			{#if browser}
				{@const href = browser ? window.location.origin + '/' + url.tinyId : 'l'}
				<Button
					{href}
					variant="link"
					data-sveltekit-preload-data="off"
					class={cn('mx-auto flex items-center gap-1', index === 2 ? 'col-span-2 mx-auto' : '')}
				>
					<Link2 />
					{href}
					<p
						class="mx-1 flex aspect-square h-full items-center justify-center rounded bg-primary-foreground px-1 font-bold"
					>
						{url.redirects}
					</p>
				</Button>
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
		{/each}
	</div>
</div>
