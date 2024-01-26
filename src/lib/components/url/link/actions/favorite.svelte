<script lang="ts">
	import { favoritesStore } from '$lib/stores';
	import { Button } from '$shadcn/button';
	import * as Tooltip from '$shadcn/tooltip';
	import { Star, StarFilled } from 'radix-icons-svelte';

	export let id: string;

	$: isFavorite = $favoritesStore.includes(id);

	const toggleFavorite = () => {
		if (isFavorite) favoritesStore.remove([id]);
		else favoritesStore.add([id]);
	};
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button
			variant="secondary"
			builders={[builder]}
			class="flex aspect-square h-5 w-5 items-center justify-center rounded px-1 text-sm font-bold"
			on:click={toggleFavorite}
		>
			{#if isFavorite}
				<StarFilled />
			{:else}
				<Star />
			{/if}
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content class="text-foreground-muted bg-secondary text-xs">
		<p>Add to favorites</p>
	</Tooltip.Content>
</Tooltip.Root>
