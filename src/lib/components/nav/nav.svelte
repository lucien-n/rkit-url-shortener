<script lang="ts">
	import FavoriteUrlsPopover from '$lib/components/nav/favorite-urls-popover.svelte';
	import LightSwitch from '$lib/components/nav/light-switch.svelte';
	import MyUrlsPopover from '$lib/components/nav/my-urls-popover.svelte';
</script>

<nav class="flex flex-col gap-3">
	<LightSwitch />
	<MyUrlsPopover />
	<FavoriteUrlsPopover />
</nav>
