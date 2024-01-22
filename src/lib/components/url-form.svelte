<script lang="ts">
	import { enhance } from '$app/forms';
	import { createUrlSchema, type CreateUrlSchema } from '$remult/url/inputs/create-url-input';
	import rules from '$remult/url/url.rules';
	import * as Form from '$shadcn/form';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<CreateUrlSchema>;

	const dispatch = createEventDispatcher();

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
	<form method="POST" class="flex items-center gap-3" use:enhance={handleSubmit}>
		<Form.Field {config} name="url">
			<Form.Item class="w-full space-y-0">
				<Form.Validation />
				<Form.Input
					type="text"
					class="p-6 text-xl"
					placeholder="https://myurl.site"
					minlength={rules.url.min}
					maxlength={rules.url.max}
					required
				/>
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Button class="py-6 text-xl" disabled={loading}
			>{loading ? 'Shortening' : 'Shorten'}</Form.Button
		>
	</form>
</Form.Root>
