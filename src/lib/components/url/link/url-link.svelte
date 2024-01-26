<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_ORIGIN } from '$env/static/public';
	import { stripProtocol } from '$lib/utils';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { Button } from '$shadcn/button';
	import * as Tooltip from '$shadcn/tooltip';
	import moment from 'moment';
	import { Link2 } from 'radix-icons-svelte';
	import CopyToClipboard from './actions/copy-to-clipboard.svelte';
	import Favorite from './actions/favorite.svelte';
	import RedirectCount from './actions/redirect-count.svelte';

	export let url: ShortUrl;

	const willExpire = (): boolean =>
		new Date(url.expiresAt).getUTCFullYear() > new Date().getUTCFullYear() + 10;
</script>

<div class="flex w-full flex-row items-center justify-between gap-1">
	{#if browser}
		{@const href = PUBLIC_ORIGIN + url.id}
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button
					{href}
					variant="link"
					data-sveltekit-preload-data="off"
					class="mx-auto flex w-full items-center justify-start gap-1 px-1"
				>
					<Link2 />
					<p>
						<span class="text-primary/50">{stripProtocol(PUBLIC_ORIGIN)}</span><strong
							>{url.id}</strong
						>
					</p>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content class="text-foreground-muted bg-secondary text-sm">
				<p>Created {moment(url.createdAt).fromNow()}</p>
				<p>{willExpire() ? 'Never expires' : `Expires ${moment(url.expiresAt).fromNow()}`}</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<div class="flex justify-end gap-1">
			<RedirectCount redirects={url.redirects} />
			<CopyToClipboard {href} />
			<Favorite id={url.id} />
		</div>
	{:else}
		<Button
			variant="link"
			data-sveltekit-preload-data="off"
			class="mx-auto flex items-center gap-1"
		>
			<Link2 />
			<p class="h-3 w-52 animate-pulse rounded bg-primary/60" />
		</Button>
	{/if}
</div>
