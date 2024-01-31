<script>
	import Nav from '$comp/nav/nav.svelte';
	import { titleStore } from '$lib/stores/title';
	import { Toaster } from '$shadcn/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../../app.pcss';
</script>

<svelte:head>
	<title>{'Shortenner' ?? $titleStore}</title>
</svelte:head>

<Toaster richColors />
<ModeWatcher />

<div class="h-full w-full">
	<div class="absolute m-3">
		<Nav />
	</div>

	<main class="mx-2 h-full md:container">
		<slot />
	</main>
</div>
