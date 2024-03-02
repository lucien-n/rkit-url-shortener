<script lang="ts">
	import Counter from '$components/counter.svelte';
	import UrlSuccessDialog from '$components/dialogs/url-success-dialog.svelte';
	import CreateUrlForm from '$components/forms/create-url-form.svelte';
	import Seo from '$components/seo.svelte';
	import type { ShortUrl } from '$shared/modules/short-urls/short-url.entity';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;

	let showSuccessDialog = false;
	let shortUrl: ShortUrl | null = null;
</script>

<Seo title="Shortener" />

<div class=" grid h-full grid-rows-3 md:container">
	<div class="flex w-full flex-col self-center md:self-end">
		<h1 class="text-6xl font-extrabold tracking-tight md:text-8xl">URL Shortener</h1>
		<div>
			<Counter count={2124121224} />
			<h3 class="px-3 text-2xl text-muted-foreground">urls shortened</h3>
		</div>
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
