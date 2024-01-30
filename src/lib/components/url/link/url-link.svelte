<script lang="ts">
	import { browser } from '$app/environment';
	import { URL_EXPIRATION_TRESHOLD_DAYS } from '$env/static/private';
	import { PUBLIC_ORIGIN } from '$env/static/public';
	import { stripProtocol } from '$lib/utils';
	import type { ShortUrl } from '$remult/short-url/short-url.entity';
	import { Button } from '$shadcn/button';
	import * as Tooltip from '$shadcn/tooltip';
	import moment from 'moment';
	import { ExclamationTriangle, Link2 } from 'radix-icons-svelte';
	import CopyToClipboard from './actions/copy-to-clipboard.svelte';
	import Favorite from './actions/favorite.svelte';
	import RedirectCount from './actions/redirect-count.svelte';

	export let url: ShortUrl;

	const expiresAt = new Date(url.expiresAt);
	const now = new Date();

	const willExpire = expiresAt.getUTCFullYear() > now.getUTCFullYear() + 10;
	const expirationWarning =
		expiresAt.getTime() - now < 1000 * 60 * 60 * 24 * parseInt(URL_EXPIRATION_TRESHOLD_DAYS ?? '7'); // miliseconds * seconds * minutes * hours * days
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
					{#if expirationWarning}
						<ExclamationTriangle />
					{:else}
						<Link2 />
					{/if}
					<p>
						<span class="text-primary/50">{stripProtocol(PUBLIC_ORIGIN)}</span><strong
							>{url.id}</strong
						>
					</p>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content class="text-foreground-muted bg-secondary text-sm">
				<p>Created {moment(url.createdAt).fromNow()}</p>
				{#if willExpire}
					<p>Never expires</p>
				{:else}
					<p>Expires {moment(url.expiresAt).fromNow()}</p>
				{/if}
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
