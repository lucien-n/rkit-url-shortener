<script lang="ts">
	import { enhance } from '$app/forms';
	import { Expiration } from '$remult/url/enums/expiration.enum';
	import { createUrlSchema, type CreateUrlSchema } from '$remult/url/inputs/create-url-input';
	import rules from '$remult/url/url.rules';
	import * as Form from '$shadcn/form';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Link2 } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<CreateUrlSchema>;

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

<Form.Root {form} schema={createUrlSchema} let:config>
	<form method="POST" class="flex flex-col items-center gap-3" use:enhance={handleSubmit}>
		<Form.Field {config} name="expiration">
			<Form.Item class="w-full space-y-0">
				<Form.Validation />
				<Form.Select selected={expirationSelectOptions[2]}>
					<Form.SelectTrigger placeholder="Expiration" />
					<Form.SelectContent>
						{#each expirationSelectOptions as { value, label } (value)}
							<Form.SelectItem {value}>
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
				</Form.Select>
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="url">
			<Form.Item class="w-full space-y-0">
				<Form.Validation />
				<Form.Input
					type="text"
					class="p-6 text-xl"
					placeholder="https://my-long-url.site"
					minlength={rules.url.min}
					maxlength={rules.url.max}
					required
				/>
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Button class="flex w-full gap-1 py-6 text-xl" disabled={loading}>
			<Link2 size="24" />
			{loading ? 'Shortening' : 'Shorten'}
		</Form.Button>
	</form>
</Form.Root>
