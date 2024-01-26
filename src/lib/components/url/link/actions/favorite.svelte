<script lang="ts">
	import { favoritesStore } from '$lib/stores';
	import { Button } from '$shadcn/button';
	import { Star, StarFilled } from 'radix-icons-svelte';

	export let id: string;

	$: isFavorite = $favoritesStore.includes(id);

	const toggleFavorite = () => {
		if (isFavorite) favoritesStore.remove([id]);
		else favoritesStore.add([id]);
	};
</script>

<Button
	variant="secondary"
	class="flex aspect-square h-5 w-5 items-center justify-center rounded px-1 text-sm font-bold"
	on:click={toggleFavorite}
>
	{#if isFavorite}
		<StarFilled />
	{:else}
		<Star />
	{/if}
</Button>
