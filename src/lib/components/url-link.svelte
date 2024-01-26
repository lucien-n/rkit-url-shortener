<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_ORIGIN } from '$env/static/public';
	import { favoritesStore } from '$lib/stores';
	import { copyToClipboard, stripProtocol } from '$lib/utils';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { Button } from '$shadcn/button';
	import * as Tooltip from '$shadcn/tooltip';
	import moment from 'moment';
	import { Clipboard, Link2, Star, StarFilled } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import CustomToast from './custom-toast.svelte';

	export let url: ShortUrl;

	$: isFavorite = $favoritesStore.includes(url.id);

	const formatCount = (count: number) => {
		const formatter = Intl.NumberFormat('en', { notation: 'compact' });
		return formatter.format(count);
	};

	const toggleFavorite = () => {
		if (isFavorite) favoritesStore.remove([url.id]);
		else favoritesStore.add([url.id]);
	};

	const willExpire = (): boolean =>
		new Date(url.expiresAt).getUTCFullYear() > new Date().getUTCFullYear() + 10;
</script>

<div class="flex w-full flex-row items-center justify-between gap-1">
	{#if browser}
		{@const href = PUBLIC_ORIGIN + url.id}
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button
					{href}
					variant="link"
					data-sveltekit-preload-data="off"
					class="mx-auto flex w-full items-center justify-start gap-1 px-1"
				>
					<Link2 />
					<p>
						<span class="text-primary/50">{stripProtocol(PUBLIC_ORIGIN)}</span><strong
							>{url.id}</strong
						>
					</p>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content class="text-foreground-muted bg-secondary text-sm">
				<p>Created {moment(url.createdAt).fromNow()}</p>

				<p>{willExpire() ? 'Never expires' : `Expires ${moment(url.expiresAt).fromNow()}`}</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<div class="flex justify-end gap-1">
			<p
				class="flex aspect-square h-5 items-center justify-center rounded bg-primary-foreground px-1 text-sm font-bold text-primary"
			>
				{formatCount(url.redirects)}
			</p>
			<Button
				variant="secondary"
				class="flex aspect-square h-5 w-5 items-center justify-center rounded px-1 text-sm font-bold"
				on:click={() =>
					copyToClipboard(
						href,
						() =>
							toast.success(CustomToast, {
								componentProps: {
									content: `Successfully copied <strong>${href}</strong> to your clipboard`
								}
							}),
						() =>
							toast.error(CustomToast, {
								componentProps: {
									content: `Error while copying <strong>${href}</strong> to your clipboard`
								}
							})
					)}
			>
				<Clipboard />
			</Button>
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
		</div>
	{:else}
		<Button
			variant="link"
			data-sveltekit-preload-data="off"
			class="mx-auto flex items-center gap-1"
		>
			<Link2 />
			<p class="h-3 w-52 animate-pulse rounded bg-primary/60" />
		</Button>
	{/if}
</div>
