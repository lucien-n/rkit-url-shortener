<script lang="ts">
	import { cn } from '$lib/shadcn/utils';
	import { Button, type Props } from '$shadcn/button';
	import { createEventDispatcher } from 'svelte';

	type $$Props = Props;
	export let builders: $$Props['builders'] = [];

	export let hovered = false;
	export let showText = false;
	const dispatch = createEventDispatcher();

	let timer = -1;

	const resetTimer = () => {
		clearTimeout(timer);
	};

	const startTimer = () => {
		timer = setTimeout(() => {
			if (hovered) showText = true;
			console.log('tineout');
			resetTimer();
		}, 100);
	};

	const handleMouseEnter = () => {
		hovered = true;
		startTimer();
	};

	const handleMouseLeave = () => {
		hovered = false;
		showText = false;
		resetTimer();
	};

	const handleClick = (...args) => dispatch('click', ...args);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	class="transition-all duration-500 ease-in-out"
>
	<Button
		variant="outline"
		class={cn(
			'flex gap-2 p-[.45rem] transition-all duration-500 ease-in-out',
			!showText && 'aspect-square'
		)}
		{builders}
		on:click={handleClick}
	>
		<div class="flex transition-all duration-500 ease-in-out">
			<slot />
			<div
				class={cn(
					'w-0 overflow-hidden transition-all duration-500 ease-in-out',
					showText && 'w-28 px-2'
				)}
			>
				<slot name="text" />
			</div>
		</div>
	</Button>
</div>
