<script>
	import Download from '../components/Download.svelte';
	import Gif from '../components/Gif.svelte';
	import Images from '../components/Images.svelte';
	import Options from '../components/Options.svelte';
	import Upload from '../components/Upload.svelte';
</script>

<svelte:head>
	<title>GifSquare</title>
	<meta name="description" content="Create square gifs like a breeze." />
</svelte:head>

<div class="flex py-4 min-h-[80vh] items-center justify-center">
	<div
		class="bg-white bg-opacity-50 rounded-lg shadow-md flex-grow container max-w-3xl items-center justify-center flex flex-col py-8 px-4 min-h-[30rem] mx-4 gap-4"
	>
		<Gif />
		<Images />
		<Options />
		<div class="flex gap-2">
			<Upload />
			<Download />
		</div>
	</div>
</div>
