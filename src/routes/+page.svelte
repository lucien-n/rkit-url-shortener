<script lang="ts">
	import MostViewed from '$lib/components/most-viewed.svelte';
	import UrlDialog from '$lib/components/url-dialog.svelte';
	import UrlForm from '$lib/components/url-form.svelte';
	import type { Url } from '$remult/url/url.entity';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;

	let showSuccessDialog = false;
	let shortenedUrl: Url | null = null;
</script>

<div class="grid min-h-screen w-full grid-rows-3 flex-col items-center justify-center space-y-8">
	<div class="self-end">
		<h2 class="mt-6 text-center text-7xl font-extrabold text-gray-900 dark:text-gray-100">
			URL Shortener
		</h2>
		<p class="text-md mt-2 text-center text-gray-600 dark:text-gray-400">
			Enter your long URL below to shorten it
		</p>
	</div>
	<UrlForm
		form={data.form}
		on:success={({ detail }) => {
			shortenedUrl = detail.data.shortenedUrl;
			showSuccessDialog = true;
		}}
		on:failure={() => {
			toast.error('An error occured, please try again later');
		}}
	/>
	<div class="self-center">
		<MostViewed mostViewedUrls={data.mostViewedUrls} />
	</div>
</div>

<UrlDialog url={shortenedUrl} bind:open={showSuccessDialog} />
