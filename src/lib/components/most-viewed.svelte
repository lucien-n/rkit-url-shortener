<script lang="ts">
	import UrlLink from '$comp/url/link/url-link.svelte';
	import { cn } from '$lib/shadcn/utils';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';

	export let mostViewedUrls: ShortUrl[];
</script>

<div>
	<p class="text-center text-lg font-bold">Most viewed urls</p>
	<div class="grid grid-cols-1 items-center gap-x-8 sm:grid-cols-2">
		{#each mostViewedUrls as url, index (url.id)}
			<div class={cn('mx-auto flex items-center gap-1', index === 2 ? 'col-span-2 mx-auto' : '')}>
				<UrlLink {url} />
			</div>
		{/each}
	</div>
</div>
