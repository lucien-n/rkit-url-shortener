<script lang="ts">
	import { copyToClipboard } from '$lib/utils';
	import { Button } from '$shadcn/button';
	import * as Dialog from '$shadcn/dialog';

	export let open = false;
	export let shortenedUrl: string;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Shortened url</Dialog.Title>
			<Dialog.Description>Here'es your shortened url!</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer>
			<Button variant="secondary" type="submit">Close</Button>
			<Button on:click={() => copyToClipboard(shortenedUrl, () => console.log('Success'))}
				>Copy</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
