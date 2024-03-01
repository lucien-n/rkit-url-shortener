<script lang="ts">
	import { page } from '$app/stores';
	import { Toaster } from 'svelte-sonner';
	import { fly } from 'svelte/transition';
	import '../app.pcss';
	import Seo from '$components/seo.svelte';
</script>

<Seo />

<Toaster richColors />

{#key $page.url.href}
	<main class="h-full w-full" in:fly={{ duration: 200, y: -200 }}>
		<slot />
	</main>
{/key}
