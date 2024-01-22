<script>
	import LightSwitch from '$lib/components/light-switch.svelte';
	import { Toaster } from '$shadcn/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
</script>

<Toaster richColors />
<ModeWatcher />

<div class="h-full w-full">
	<div class="absolute m-3">
		<LightSwitch />
	</div>

	<main class="container h-full">
		<slot />
	</main>
</div>
