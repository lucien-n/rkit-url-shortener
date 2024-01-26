<script lang="ts">
	import { enhance } from '$app/forms';
	import { cn } from '$lib/shadcn/utils';
	import { Expiration } from '$remult/short-url/enums/expiration.enum';
	import { createShortUrlSchema } from '$remult/short-url/inputs/create-short-url-input';
	import rules from '$remult/short-url/short-url.rules';
	import * as Form from '$shadcn/form';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Link2, Rocket } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<createShortUrlSchema>;

	const dispatch = createEventDispatcher();

	const expirationSelectOptions: { value: string; label: string }[] = [
		{
			value: Expiration.OneDay,
			label: '1 day'
		},
		{
			value: Expiration.OneWeek,
			label: '1 week'
		},
		{
			value: Expiration.OneMonth,
			label: '1 month'
		},
		{
			value: Expiration.OneYear,
			label: '1 year'
		},
		{
			value: Expiration.Never,
			label: 'Never'
		}
	];

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result }) => {
			loading = false;

			dispatch(result.type, result);
		};
	};
</script>

<Form.Root {form} schema={createShortUrlSchema} let:config>
	<form method="POST" class="flex flex-col items-center gap-3" use:enhance={handleSubmit}>
		<Form.Field {config} name="expiration">
			<Form.Item class="w-full space-y-0">
				<Form.Validation />
				<Form.Select selected={expirationSelectOptions[2]}>
					<div class="flex">
						<div
							class="hidden select-none self-center rounded-md rounded-r-none border border-r-0 bg-muted px-3 py-[.312rem] md:flex"
						>
							Expiration
						</div>
						<Form.SelectTrigger class="md:rounded-l-none" placeholder="Expiration" />
						<Form.SelectContent>
							{#each expirationSelectOptions as { value, label } (value)}
								<Form.SelectItem {label} {value}>
									{label}
									{#if value === Expiration.Never}
										<p class="ml-2 text-xs font-semibold italic text-muted-foreground">
											- If selected, short urls which haven't been used in <strong>90</strong> days will
											be deleted
										</p>
									{/if}
								</Form.SelectItem>
							{/each}
						</Form.SelectContent>
					</div>
				</Form.Select>
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="url">
			<Form.Item class="w-full space-y-0">
				<Form.Validation />
				<Form.Input
					type="text"
					class="text-lg md:p-6 md:text-xl"
					placeholder="https://my-long-url.site"
					minlength={rules.url.min}
					maxlength={rules.url.max}
					required
				/>
			</Form.Item>
		</Form.Field>
		<br />
		<input type="checkbox" bind:checked={loading} />
		<Form.Button
			class=" flex w-full gap-1 overflow-hidden py-6 text-2xl font-bold tracking-tight text-primary-foreground transition-all duration-300 ease-in-out"
			disabled={loading}
		>
			<Link2 size="24" />
			{loading ? 'Shortening' : 'Shorten'}

			<div class={cn('ml-5 hidden overflow-hidden', loading && 'animate-rocket flex')}>
				<Rocket class="h-[1.5rem] w-[1.5rem]" />
			</div>
		</Form.Button>
	</form>
</Form.Root>

<style>
	.animate-rocket {
		animation: rocket 1.5s cubic-bezier(0.75, 0, 0.25, 1) infinite;
	}

	@keyframes rocket {
		0% {
			transform: translate(-150%, 150%);
		}
		100% {
			transform: translate(250%, -250%);
		}
	}
</style>
