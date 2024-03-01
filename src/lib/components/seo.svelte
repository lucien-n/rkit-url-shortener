<script>
	export let title = 'Shortener';
	export let description =
		'Easily shorten long URLs. Generate concise, shareable links in seconds.';
	export let image = 'https://s.lucienn.dev/shortenner.png';
	export let keywords =
		'URL shortener, short URLs, link shortening, shorten links, URL generator, link generator, URL shrinker, shortener service, custom short URLs, shorten long URLs, URL abbreviation, link abbreviator, link truncator, URL compressor, link compressor, URL condenser, link condenser, URL simplifier, link simplifier, URL cutter, link cutter, URL trimmer, link trimmer, URL minifier, link minifier';
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://s.lucienn.dev/" />
	<meta property="og:image" content={image} />
	<meta name="keywords" content={keywords} />
</svelte:head>
