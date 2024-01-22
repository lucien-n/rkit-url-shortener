<script lang="ts">
	import MostViewed from '$lib/components/most-viewed.svelte';
	import UrlDialog from '$lib/components/url-dialog.svelte';
	import UrlForm from '$lib/components/url-form.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;

	let showSuccessDialog = false;
	let shortenedUrl = '';
</script>

<div class="flex min-h-screen flex-col items-center justify-center space-y-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-xl space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
				URL Shortener
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				Enter your long URL below to shorten it
			</p>
		</div>
		<div class="mt-8 space-y-6">
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

	<MostViewed mostViewedUrls={data.mostViewedUrls} />
</div>

<UrlDialog {shortenedUrl} bind:open={showSuccessDialog} />
