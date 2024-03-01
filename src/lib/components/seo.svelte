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
	<meta name="description" content={description} />
	<meta name="og:site_name" content="Shortener" />
	<meta name="og:title" content={title} />
	<meta name="og:description" content={description} />
	<meta name="og:url" content="https://s.lucienn.dev/" />
	<meta name="og:image" content={image} />
	<meta name="keywords" content={keywords} />
</svelte:head>
