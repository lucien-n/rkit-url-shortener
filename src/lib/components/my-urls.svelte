<script lang="ts">
	import { getUrlsIdsFromLocalStorage } from '$lib/utils';
	import { ShortUrl } from '$remult/short-url/short-url.entity';
	import * as Card from '$shadcn/card';
	import { onMount } from 'svelte';
	import UrlLink from './url-link.svelte';

	let urls: ShortUrl[] = [];

	onMount(async () => {
		const localUrlsIds = getUrlsIdsFromLocalStorage();
		urls = await fetch(`/api/urls`);
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Your urls</Card.Title>
		<Card.Description>Urls created via this device</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if urls.length}
			{#each urls as url}
				<UrlLink {url} />
			{/each}
		{:else}
			<p>No urls!</p>
		{/if}
	</Card.Content>
</Card.Root>
