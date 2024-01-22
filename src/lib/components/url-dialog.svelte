<script lang="ts">
	import { browser } from '$app/environment';
	import { getDaysBetweenDates } from '$lib/helpers';
	import { copyToClipboard } from '$lib/utils';
	import type { Url } from '$remult/url/url.entity';
	import { Button } from '$shadcn/button';
	import * as Dialog from '$shadcn/dialog';
	import { ClipboardCopy } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';

	export let open = false;
	export let url: Url;

	let copySucceeded = false;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Success!</Dialog.Title>
			<Dialog.Description
				>Here's your short url! It is set to expire in <strong
					>{getDaysBetweenDates(url.createdAt, url.expiratesAt)}</strong
				> days</Dialog.Description
			>
		</Dialog.Header>

		<div class="my-5 text-center">
			<Button
				class="border text-lg"
				variant="link"
				href={url.url}
				data-sveltekit-preload-data="off"
			>
				<p class="text-foreground/80">
					{browser ? window.location.origin : 'origin'}/
				</p>
				<p class="font-bold">{url.tinyId}</p>
			</Button>
		</div>

		<Dialog.Footer>
			<Button variant="secondary" on:click={() => (open = false)}>Close</Button>
			<Button
				class="flex items-center gap-1 "
				on:click={() => {
					if (copySucceeded) return;
					copyToClipboard(
						url.url,
						() => {
							copySucceeded = true;
							toast.success('Url copied to your clipboard successfully!');
							setTimeout(() => (copySucceeded = false), 2000);
						},
						() => {
							copySucceeded = false;
							toast.error('An error occured while copying to your clipboard.');
						}
					);
				}}
				>{copySucceeded ? 'Copied!' : 'Copy'}
				{#if !copySucceeded}
					<ClipboardCopy />
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
