<script lang="ts">
	import CustomToast from '$comp/custom-toast.svelte';
	import { copyToClipboard } from '$lib/utils';
	import { Button } from '$shadcn/button';
	import { Clipboard } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';

	export let href: string;
</script>

<Button
	variant="secondary"
	class="flex aspect-square h-5 w-5 items-center justify-center rounded px-1 text-sm font-bold"
	on:click={() =>
		copyToClipboard(
			href,
			() =>
				toast.success(CustomToast, {
					componentProps: {
						content: `Successfully copied <strong>${href}</strong> to your clipboard`
					}
				}),
			() =>
				toast.error(CustomToast, {
					componentProps: {
						content: `Error while copying <strong>${href}</strong> to your clipboard`
					}
				})
		)}
>
	<Clipboard />
</Button>
