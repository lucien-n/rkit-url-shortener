<script>
	export let title = 'Shortener';
	export let type = 'website';
	export let description =
		'Easily shorten long URLs. Generate concise, shareable links in seconds.';
	export let image = 'https://s.lucienn.dev/shortener.png';
	export let imageWidth = '512';
	export let imageHeight = '256';
	export let keywords =
		'URL shortener, short URLs, link shortening, shorten links, URL generator, link generator, URL shrinker, shortener service, custom short URLs, shorten long URLs, URL abbreviation, link abbreviator, link truncator, URL compressor, link compressor, URL condenser, link condenser, URL simplifier, link simplifier, URL cutter, link cutter, URL trimmer, link trimmer, URL minifier, link minifier';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="og:title" content={title} />
	<meta property="og:type" content={type} />
	<meta name="og:description" content={description} />
	<meta name="og:image" content={image} />
	<meta name="og:image:width" content={imageWidth} />
	<meta name="og:image:height" content={imageHeight} />
	<meta name="og:image" content={image} />
	<meta name="og:image:secure_url" content={image} />
	<meta name="og:site_name" content="Shortener" />
	<meta name="og:url" content="https://s.lucienn.dev/" />
	<meta name="author" content="lucienn" />
</svelte:head>
