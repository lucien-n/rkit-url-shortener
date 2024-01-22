<script lang="ts">
	import { copyToClipboard } from '$lib/utils';
	import { Button } from '$shadcn/button';
	import * as Dialog from '$shadcn/dialog';
	import { ClipboardCopy } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';

	export let open = false;
	export let shortenedUrl: string;

	let copySucceeded = false;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Success!</Dialog.Title>
			<Dialog.Description>Here's your short url!</Dialog.Description>
		</Dialog.Header>

		<div class="my-5 text-center">
			<Button
				class="border text-lg"
				variant="link"
				href={shortenedUrl}
				data-sveltekit-preload-data="off"
			>
				<p class="text-foreground/80">
					{shortenedUrl.split('/').slice(0, -1).join('/')}/
				</p>
				<p class="font-bold">{shortenedUrl.split('/').slice(-1)}</p>
			</Button>
		</div>

		<Dialog.Footer>
			<Button variant="secondary" on:click={() => (open = false)}>Close</Button>
			<Button
				class="flex items-center gap-1 "
				on:click={() => {
					if (copySucceeded) return;
					copyToClipboard(
						shortenedUrl,
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
