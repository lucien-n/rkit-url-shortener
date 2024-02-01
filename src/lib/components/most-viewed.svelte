<script lang="ts">
	import UrlLink from '$comp/url/link/url-link.svelte';
	import { cn } from '$lib/shadcn/utils';

	const getMostViewedUrls = async () => {
		const url = new URL(window.location.origin + '/api/urls');
		url.searchParams.set('mostViewed', 'true');

		try {
			const res = await fetch(url);
			const data = await res.json();
			if (typeof data === 'object' && data.length) {
				return data;
			}
		} catch (e) {
			/* empty catch */
		}

		return null;
	};
</script>

<div>
	<p class="text-center text-lg font-bold">Most viewed urls</p>
	<div class="grid-cols-2 items-center justify-between sm:grid">
		{#await getMostViewedUrls()}
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each { length: 3 } as _, index}
				<div class={cn('mx-auto flex items-center gap-1', index === 2 ? 'col-span-2 mx-auto' : '')}>
					<UrlLink url={null} />
				</div>
			{/each}
		{:then urls}
			{#each urls as url, index (url.id)}
				<div class={cn('mx-auto flex items-center gap-1', index === 2 ? 'col-span-2 mx-auto' : '')}>
					<UrlLink {url} />
				</div>
			{/each}
		{/await}
	</div>
</div>
