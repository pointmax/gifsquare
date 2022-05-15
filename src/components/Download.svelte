<script>
	import { gifSrc, imagesArray } from '../stores';
</script>

{#if $gifSrc && $imagesArray.length}
	<a class="button" href={$gifSrc} download="animation.gif"
		>Download <span class="text-xs">~{Math.ceil((($gifSrc.length / 4) * 3) / 1024)} KB</span>
	</a>
{/if}
