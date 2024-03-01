<script lang="ts">
	import CreateUrlForm from '$components/forms/create-url-form.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import type { ShortUrl } from '$shared/modules/short-urls/short-url.entity';
	import UrlSuccessDialog from '$components/dialogs/url-success-dialog.svelte';
	import { onMount } from 'svelte';
	import { titleStore } from '$lib/stores';

	export let data: PageData;

	let showSuccessDialog = false;
	let shortUrl: ShortUrl | null = null;

	onMount(() => titleStore.set('Shortener'));
</script>

<div class=" grid h-full grid-rows-3 md:container">
	<div class="prose prose-2xl flex w-full flex-col self-center md:self-end">
		<h1 class="text-6xl md:text-8xl">URL Shortener</h1>
	</div>
	<div class="h-fit w-full self-center md:w-3/4">
		<CreateUrlForm
			data={data.form}
			on:failure={({ detail }) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const { message } = detail.data;
				if (!message) return;
				toast.error(message);
			}}
			on:success={({ detail }) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				shortUrl = detail.data.result;
				showSuccessDialog = true;
				toast.success('Url shortened succesfully');
			}}
		/>
	</div>
</div>

{#if shortUrl}
	<UrlSuccessDialog bind:open={showSuccessDialog} {shortUrl} />
{/if}
