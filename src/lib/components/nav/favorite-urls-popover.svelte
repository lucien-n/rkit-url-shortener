<script lang="ts">
	import NavButton from '$lib/components/nav/nav-button.svelte';
	import UrlLink from '$lib/components/url/url-link.svelte';
	import { favoritesStore } from '$lib/stores';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { Button } from '$shadcn/button';
	import * as Collapsible from '$shadcn/collapsible';
	import * as Popover from '$shadcn/popover';
	import { CaretSort, Star } from 'radix-icons-svelte';
	import { onDestroy, onMount } from 'svelte';

	let urls: ShortUrl[] = [];
	let unsubscribe: (() => void) | null = null;

	onMount(() => {
		unsubscribe = favoritesStore.subscribe(async (favoritesIds) => {
			urls = urls.filter(({ id }) => favoritesIds.includes(id));

			const urlsIdsToFetch = favoritesIds.filter(
				(favoriteId) => !urls.some(({ id }) => id === favoriteId)
			);
			const fetchUrl = new URL(window.location.origin + '/api/urls');
			fetchUrl.searchParams.set('ids', JSON.stringify(urlsIdsToFetch));

			try {
				const res = await fetch(fetchUrl);
				const data = await res.json();
				if (typeof data === 'object' && data.length) {
					urls = [...urls, ...data];
				}
			} catch (e) {
				urls = [];
			}
		});
	});

	onDestroy(() => unsubscribe?.());
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<NavButton builders={[builder]}>
			<Star class="h-[1.2rem] w-[1.2rem] transition-all" />
			<svelte:fragment slot="text">Favorite Urls</svelte:fragment>
		</NavButton>
	</Popover.Trigger>
	<Popover.Content class="m-1 min-w-96 space-y-3 font-mono">
		<Collapsible.Root class="space-y-2">
			<div class="flex items-center justify-between">
				<h4 class="text-sm font-semibold">Your favorite urls ({urls.length})</h4>
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
						<CaretSort class="h-6 w-6" />
						<span class="sr-only">Toggle</span>
					</Button>
				</Collapsible.Trigger>
			</div>
			{#if urls.length}
				{#each urls.slice(0, 3) as url}
					<div class="rounded border px-2">
						<UrlLink {url} />
					</div>
				{/each}
				<Collapsible.Content class="space-y-2">
					{#if urls.length > 3}
						{#each urls.slice(3) as url}
							<div class="rounded border px-2">
								<UrlLink {url} />
							</div>
						{/each}
					{:else}
						<p class="px-1">No more urls!</p>
					{/if}
				</Collapsible.Content>
			{:else}
				<p>No urls!</p>
			{/if}
		</Collapsible.Root>
	</Popover.Content>
</Popover.Root>
