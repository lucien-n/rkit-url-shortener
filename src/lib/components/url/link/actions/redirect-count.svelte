<script lang="ts">
	import { Button } from '$shadcn/button';
	import * as Tooltip from '$shadcn/tooltip';

	export let redirects: number;

	const formatCount = (count: number) => {
		const formatter = Intl.NumberFormat('en', { notation: 'compact' });
		return formatter.format(count);
	};
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="flex aspect-square h-5 cursor-default select-text items-center justify-center rounded bg-primary-foreground px-1 text-sm font-bold text-primary hover:bg-primary/30"
		>
			{formatCount(redirects)}
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content class="text-foreground-muted bg-secondary text-xs">
		<p>{redirects} views</p>
	</Tooltip.Content>
</Tooltip.Root>
