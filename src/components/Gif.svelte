<script>
	import { onMount } from 'svelte';
	import * as gifshot from 'gifshot';
	import { imagesArray } from '../stores';

	let gifSrc;
	let interval = 1;

	const createGif = () => {
		console.log('creating gif!');
		gifshot.createGIF(
			{
				images: $imagesArray,
				interval,
				gifWidth: 600,
				gifHeight: 600
			},
			function (obj) {
				if (!obj.error) {
					gifSrc = obj.image;
				}
			}
		);
	};

	$: $imagesArray?.length && interval && gifshot?.createGIF && createGif();

	onMount(async () => {
		// client-only code here
	});
</script>

{#if gifSrc}
	<img src={gifSrc} alt="gif" class="shadow" />
	<input type="range" min="0.1" max="10" step="0.1" bind:value={interval} />
	<input type="number" min="0.1" max="10" step="0.1" bind:value={interval} />
	<a href={gifSrc} download="animation.gif">Download</a>
{/if}
