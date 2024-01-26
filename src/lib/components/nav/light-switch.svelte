<script lang="ts">
	import { Moon, Sun } from 'radix-icons-svelte';

	import NavButton from '$lib/components/nav/nav-button.svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<NavButton on:click={toggleMode}>
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
	<svelte:fragment slot="text">Toggle theme</svelte:fragment>
</NavButton>
