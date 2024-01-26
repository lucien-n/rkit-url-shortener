<script lang="ts">
	import { getUrlsIdsFromLocalStorage } from '$lib/utils';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { Button } from '$shadcn/button';
	import * as Popover from '$shadcn/popover';
	import { Separator } from '$shadcn/separator';
	import { CounterClockwiseClock } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import UrlLink from './url-link.svelte';

	let urls: ShortUrl[] = [];

	onMount(async () => {
		const localUrlsIds = getUrlsIdsFromLocalStorage();
		const fetchUrl = new URL(window.location.origin + '/api/urls');
		fetchUrl.searchParams.set('ids', JSON.stringify(localUrlsIds));

		try {
			const res = await fetch(fetchUrl);
			const data = await res.json();
			if (typeof data === 'object' && data.length) urls = data;
		} catch (e) {
			urls = [];
		}
	});
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon">
			<CounterClockwiseClock class="h-[1.2rem] w-[1.2rem] transition-all" />
		</Button>
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
