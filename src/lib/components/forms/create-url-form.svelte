<script lang="ts">
	import { cn } from '$cn';
	import { urls } from '$lib/urls';
	import { Button } from '$shadcn/button';
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import {
		createShortUrlSchema,
		type CreateShortUrlSchema
	} from '$shared/modules/short-urls/schemas/create-short-url.schema';
	import type { ActionResult } from '@sveltejs/kit';
	import { Link2 } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<CreateShortUrlSchema>>;

	const dispatch = createEventDispatcher<Record<ActionResult['type'], ActionResult>>();

	const form = superForm(data, {
		validators: zodClient(createShortUrlSchema),
		autoFocusOnError: true,
		validationMethod: 'oninput',
		onResult: ({ result }) => {
			dispatch(result.type, result);
		}
	});

	$: valid = (!$formData.url.length || $formData.url.startsWith('https://')) && !$errors.url;

	const { form: formData, enhance, submitting, errors } = form;
</script>

<form method="POST" action="/api/shorten" class="flex flex-col md:flex-row md:gap-1" use:enhance>
	<div class="flex w-full flex-col gap-2">
		<Form.Field {form} name="url" class="relative w-full">
			<Form.Control let:attrs>
				<Input
					{...attrs}
					bind:value={$formData.url}
					placeholder="https://s.lucienn.dev"
					class={cn(
						'min-h-0 w-full resize-none overflow-hidden md:px-5 md:py-6 md:text-xl',
						!valid && 'border-destructive'
					)}
				/>
			</Form.Control>
			<Form.Description class="px-2">
				<p class="px-0 text-xs md:text-sm">
					By submitting, you accept our
					<Button variant="link" href={urls.termsAndConditions} class="px-0 text-xs md:text-sm">
						terms and conditions
					</Button>
				</p>
			</Form.Description>
		</Form.Field>
	</div>
	<br />
	<Form.Button class="flex gap-2 md:px-7 md:py-6 md:text-xl" disabled={$submitting || !valid}>
		<Link2 size={20} />
		Shorten
	</Form.Button>
</form>
