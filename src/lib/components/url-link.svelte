<script lang="ts">
	import { browser } from '$app/environment';
	import { copyToClipboard } from '$lib/utils';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { Button } from '$shadcn/button';
	import { Clipboard, Link2 } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import CustomToast from './custom-toast.svelte';

	export let url: ShortUrl;
	export let hideOrigin = false;

	const formatCount = (count: number) => {
		const formatter = Intl.NumberFormat('en', { notation: 'compact' });
		return formatter.format(count);
	};
</script>

<div class="flex flex-row items-center gap-1">
	{#if browser}
		{@const origin = browser ? window.location.origin + '/' : ''}
		{@const href = origin ? origin + url.id : 'error'}
		<Button
			{href}
			variant="link"
			data-sveltekit-preload-data="off"
			class="mx-auto flex w-full items-center justify-start gap-1 px-1"
		>
			<Link2 />
			<p>
				<span class="text-primary/50">{hideOrigin ? '' : origin}</span><strong>{url.id}</strong>
			</p>
		</Button>
		<p
			class="flex aspect-square h-5 items-center justify-center rounded bg-primary-foreground px-1 text-sm font-bold text-primary"
		>
			{formatCount(url.redirects)}
		</p>
		<Button
			class="flex aspect-square h-5 items-center justify-center rounded bg-primary-foreground px-1 text-sm font-bold text-primary"
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
