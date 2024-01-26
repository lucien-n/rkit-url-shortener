<script>
	import LightSwitch from '$lib/components/light-switch.svelte';
	import { titleStore } from '$lib/stores/title';
	import { Toaster } from '$shadcn/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../../app.pcss';
</script>

<svelte:head>
	<title>{'Shortenner' ?? $titleStore}</title>
	<meta property="description" content="Quickly shorten and share your urls" />
	<meta
		property="og:image"
		content="blob:https://vercel.com/32608795-afec-4896-b74d-bfaeee6f1797"
	/>
	<meta property="og:title" content="Shortenner" />
	<meta property="og:description" content="Quickly shorten and share your urls" />
	<meta property="og:url" content="https://shortenner.lucienn.dev" />
</svelte:head>

<Toaster richColors />
<ModeWatcher />

<div class="h-full w-full font-mono">
	<div class="absolute m-3">
		<LightSwitch />
	</div>

	<main class="container h-full">
		<slot />
	</main>
</div>
