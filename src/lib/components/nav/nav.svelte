<script lang="ts">
	import FavoriteUrlsPopover from '$comp/nav/favorite-urls-popover.svelte';
	import LightSwitch from '$comp/nav/light-switch.svelte';
	import MyUrlsPopover from '$comp/nav/my-urls-popover.svelte';
</script>

<nav class="flex flex-col gap-3">
	<LightSwitch />
	<MyUrlsPopover />
	<FavoriteUrlsPopover />
</nav>
