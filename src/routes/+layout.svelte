<script>
	import { Toaster } from '$shadcn/sonner';
	import '../app.pcss';
</script>

<Toaster richColors />

<div class="h-full w-full">
	<main class="container h-full">
		<slot />
	</main>
</div>
