<script>
	import { gifSrc, imagesArray, interval } from '../stores';
</script>

{#if $gifSrc && $imagesArray.length}
	<div class="flex gap-2">
		<label for="interval">interval (in seconds):</label>
		<input
			type="range"
			class="accent-primary-700"
			min="0.1"
			max="10"
			step="0.1"
			bind:value={$interval}
		/>

		<input type="number" class="w-10" id="interval" step="0.1" bind:value={$interval} />
	</div>
{/if}
