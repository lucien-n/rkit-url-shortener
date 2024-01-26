<script lang="ts">
	import { Button } from '$shadcn/button';
	import { CounterClockwiseClock } from 'radix-icons-svelte';
	import LightSwitch from './light-switch.svelte';
	import MyUrls from './my-urls.svelte';

	let showMyUrls = false;

	let myUrlsElement: HTMLElement;

	const handleClick = (event: MouseEvent) => {
		if (!showMyUrls || !myUrlsElement) return;
		const clickedOutside = !myUrlsElement.contains(event.target);
		if (clickedOutside) showMyUrls = false;
	};
</script>

<svelte:window on:click={handleClick} />

<nav class="flex flex-col gap-3">
	<LightSwitch />
	<div class="relative" bind:this={myUrlsElement}>
		<Button
			variant={showMyUrls ? 'secondary' : 'outline'}
			size="icon"
			on:click={() => (showMyUrls = !showMyUrls)}
		>
			<CounterClockwiseClock class="h-[1.2rem] w-[1.2rem] transition-all" />
		</Button>
		{#if showMyUrls}
			<div class="absolute mt-2">
				<MyUrls />
			</div>
		{/if}
	</div>
</nav>
