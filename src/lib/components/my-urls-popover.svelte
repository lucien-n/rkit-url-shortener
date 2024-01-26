<script lang="ts">
	import { urlsStore } from '$lib/stores';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import * as Popover from '$shadcn/popover';
	import { Separator } from '$shadcn/separator';
	import { CounterClockwiseClock } from 'radix-icons-svelte';
	import { onDestroy, onMount } from 'svelte';
	import NavButton from './nav-button.svelte';
	import UrlLink from './url-link.svelte';

	let urls: ShortUrl[] = [];
	let unsubscribe: (() => void) | null = null;

	onMount(() => {
		unsubscribe = urlsStore.subscribe(async (urlsIds) => {
			urls = urls.filter(({ id }) => urlsIds.includes(id));

			const urlsIdsToFetch = urlsIds.filter(
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
			<CounterClockwiseClock class="h-[1.2rem] w-[1.2rem] transition-all" />
			<svelte:fragment slot="text">My short urls</svelte:fragment>
		</NavButton>
	</Popover.Trigger>
	<Popover.Content class="m-1 min-w-96 space-y-3 font-mono">
		<div class="flex flex-col gap-1">
			<p class="font-semibold leading-none tracking-tight">Your urls</p>
			<p class="text-sm text-muted-foreground">Urls created via this device</p>
		</div>
		<Separator />
		<div>
			{#if urls.length}
				{#each urls as url}
					<UrlLink {url} />
				{/each}
			{:else}
				<p>No urls!</p>
			{/if}
		</div>
	</Popover.Content>
</Popover.Root>
