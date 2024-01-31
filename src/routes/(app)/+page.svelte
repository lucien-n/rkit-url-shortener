<script lang="ts">
	import MostViewed from '$comp/most-viewed.svelte';
	import UrlDialog from '$comp/url/url-dialog.svelte';
	import UrlForm from '$comp/url/url-form.svelte';
	import { urlsStore } from '$lib/stores';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	export let data: PageData;

	let showSuccessDialog = false;
	let shortenedUrl: ShortUrl | null = null;
</script>

<div class="mx-auto grid min-h-screen w-full max-w-2xl grid-rows-3 flex-col items-center space-y-8">
	<div class="self-end">
		<h2
			class="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-7xl"
		>
			URL Shortener
		</h2>
		<p class="text-md mt-2 text-center text-gray-600 dark:text-gray-400">
			Enter your long URL below to shorten it
		</p>
	</div>
	<div class="w-full">
		<UrlForm
			form={data.form}
			on:success={({ detail }) => {
				console.log(detail);
				shortenedUrl = detail.data.shortenedUrl;
				showSuccessDialog = true;

				if (shortenedUrl) urlsStore.add([shortenedUrl.id]);
			}}
			on:failure={({ detail }) => {
				const message = detail.data.form.message;
				toast.error(message ?? 'An error occured, please try again later');
			}}
		/>
	</div>
	<div class="self-center">
		<MostViewed mostViewedUrls={data.mostViewedUrls} />
	</div>
</div>

<UrlDialog url={shortenedUrl} bind:open={showSuccessDialog} />
