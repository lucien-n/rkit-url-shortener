<script lang="ts">
	export let count: number;

	let digits: number[] = [];

	$: digits = count
		.toString()
		.split('')
		.map((char) => parseInt(char));

	let columns: HTMLSpanElement[] = [];

	$: {
		columns.forEach((col, index) => {
			if (!col) return;
			const digit = digits[index];
			col.style.translate = `0 ${digit * -2.71}rem`;
		});
	}
</script>

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<div class="flex h-11 -space-x-1 overflow-hidden text-4xl font-extrabold">
	{#each { length: digits.length } as _, digitIndex}
		<span
			style="writing-mode: vertical-lr; text-orientation: upright;"
			class="w-8 transition-all"
			bind:this={columns[digitIndex]}
		>
			{#each { length: 10 } as _, i}
				{i}
			{/each}
		</span>
		{#if digitIndex < digits.length - 1 && digitIndex % 3 === 0}
			<span class="font-semilight w-3 pl-[.25rem] text-muted-foreground"> , </span>
		{/if}
	{/each}
</div>
