<script lang="ts">
	import UrlDialog from '$lib/components/url-dialog.svelte';
	import UrlForm from '$lib/components/url-form.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;

	let showSuccessDialog = false;
	let shortenedUrl = '';
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="text-center text-7xl font-bold tracking-tight">Url Shortener</div>

	<div class="mt-10 w-2/3">
		<UrlForm
			form={data.form}
			on:success={({ detail }) => {
				const url = detail.data.shortenedUrl;
				showSuccessDialog = true;
				shortenedUrl = url;
			}}
			on:failure={() => {
				toast.error('An error occured, please try again later');
			}}
		/>
	</div>
</div>

<UrlDialog {shortenedUrl} bind:open={showSuccessDialog} />
