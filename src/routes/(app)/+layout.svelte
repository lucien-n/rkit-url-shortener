<script>
	import LightSwitch from '$lib/components/light-switch.svelte';
	import { titleStore } from '$lib/stores/title';
	import { Toaster } from '$shadcn/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../../app.pcss';
</script>

<svelte:head>
	<title>{$titleStore}</title>
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
