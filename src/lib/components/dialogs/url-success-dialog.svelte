<script lang="ts">
	import { PUBLIC_URL_ORIGIN } from '$env/static/public';
	import { copyToClipboard } from '$lib/helpers';
	import { Button } from '$shadcn/button';
	import * as Dialog from '$shadcn/dialog';
	import type { ShortUrl } from '$shared/modules/short-urls/short-url.entity';
	import { Clipboard } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';

	export let open = false;
	export let shortUrl: ShortUrl;

	$: url = PUBLIC_URL_ORIGIN + shortUrl.id;
	$: console.log(shortUrl);
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header class="prose">
			<h2>Here's your short url!</h2>
		</Dialog.Header>

		<Button variant="link" href={url} class="p-0 text-lg">
			<span class="text-muted-foreground">{url.slice(0, -6)}</span>
			<strong>{url.slice(-6)}</strong>
		</Button>

		<Dialog.Footer>
			<Button
				class="flex gap-1"
				on:click={() =>
					copyToClipboard(
						url,
						(message) => toast.success(message),
						(message) => toast.error(message)
					)}
			>
				<Clipboard /> Copy
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
