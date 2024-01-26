<script lang="ts">
	import FavoriteUrlsPopover from './favorite-urls-popover.svelte';
	import LightSwitch from './light-switch.svelte';
	import MyUrlsPopover from './my-urls-popover.svelte';
</script>

<nav class="flex flex-col gap-3">
	<LightSwitch />
	<MyUrlsPopover />
	<FavoriteUrlsPopover />
</nav>
