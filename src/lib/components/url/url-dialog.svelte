<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_ORIGIN } from '$env/static/public';
	import { Confetti } from '$lib/confetti';
	import { getDaysBetweenDates } from '$lib/helpers';
	import { copyToClipboard, stripProtocol } from '$lib/utils';
	import { Expiration } from '$remult/short-url/enums/expiration.enum';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { Button } from '$shadcn/button';
	import * as Dialog from '$shadcn/dialog';
	import { ClipboardCopy } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import CustomToast from '../custom-toast.svelte';

	export let open = false;
	export let url: ShortUrl;

	let confetti: Confetti | null = null;

	let copySucceeded = false;
	let shorturl = '';

	onMount(() => {
		confetti = new Confetti(null, { count: 150, power: 40, fade: true });
		browser ? window.location.origin + '/' + url?.id : 'no-url';
	});

	$: if (open && browser) confetti.trigger(window.innerWidth / 2, window.innerHeight / 2);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Success!</Dialog.Title>
			<Dialog.Description>
				<p>Here's your short url!</p>
				{@const daysToExpiration = getDaysBetweenDates(url.createdAt, url.expiresAt)}
				{#if daysToExpiration > Expiration.OneYear * 100}
					<p>
						It will never expire but will be <strong>deleted</strong> if not used in during
						<strong>90</strong> days
					</p>
				{:else}
					<p>
						It is set to expire in <strong>{daysToExpiration}</strong> days
					</p>
				{/if}
			</Dialog.Description>
		</Dialog.Header>
		<div class="my-5 text-center">
			<Button
				class="border text-lg"
				variant="link"
				href={url.url}
				data-sveltekit-preload-data="off"
			>
				<p class="text-foreground/80">
					{stripProtocol(PUBLIC_ORIGIN)}
				</p>
				<p class="font-bold">{url.id}</p>
			</Button>
		</div>

		<Dialog.Footer>
			<Button variant="secondary" on:click={() => (open = false)}>Close</Button>
			<Button
				class="flex items-center gap-1 "
				on:click={() => {
					if (copySucceeded) return;
					copyToClipboard(
						shorturl,
						() => {
							toast.success(CustomToast, {
								componentProps: {
									content: `Successfully copied <strong>${shorturl}</strong> to your clipboard 🎉`
								}
							});
							copySucceeded = true;
							setTimeout(() => (copySucceeded = false), 2000);
						},
						() => {
							toast.error(CustomToast, {
								componentProps: {
									content: `Error while copying <strong>${shorturl}</strong> to your clipboard 😢`
								}
							});
							copySucceeded = false;
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
