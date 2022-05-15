<script>
	import { onMount } from 'svelte';
	import * as gifshot from 'gifshot';
	import { gifSrc, interval, imagesArray } from '../stores';

	const createGif = () => {
		console.log('creating gif!');
		gifshot.createGIF(
			{
				images: $imagesArray.flatMap((el) => el.src),
				interval: $interval,
				gifWidth: 600,
				gifHeight: 600
			},
			function (obj) {
				if (!obj.error) {
					$gifSrc = obj.image;
				}
			}
		);
	};

	$: $imagesArray?.length && $interval && gifshot?.createGIF && createGif();
</script>

{#if $gifSrc && $imagesArray.length}
	<img src={$gifSrc} alt="gif" class="shadow" />
{/if}
