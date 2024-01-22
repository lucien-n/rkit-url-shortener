<script lang="ts">
	import { copyToClipboard } from '$lib/utils';
	import { Button } from '$shadcn/button';
	import * as Dialog from '$shadcn/dialog';
	import { ClipboardCopy } from 'radix-icons-svelte';

	export let open = false;
	export let shortenedUrl: string;

	let copySucceeded = false;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Success!</Dialog.Title>
			<Dialog.Description>Here's your shortened url!</Dialog.Description>
			<Button variant="link" href={shortenedUrl}>{shortenedUrl}</Button>
		</Dialog.Header>

		<Dialog.Footer>
			<Button variant="secondary" on:click={() => (open = false)}>Close</Button>
			<Button
				class="flex items-center gap-1"
				on:click={() =>
					copyToClipboard(shortenedUrl, () => {
						copySucceeded = true;
					})}
				>{copySucceeded ? 'Copied!' : 'Copy'}
				{#if !copySucceeded}
					<ClipboardCopy />
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
