<script>
	import { imagesArray } from '../stores';
	import { flip } from 'svelte/animate';

	let hovering = false;

	const drop = (event, target) => {
		event.dataTransfer.dropEffect = 'move';
		const start = parseInt(event.dataTransfer.getData('text/plain'));
		const newImagesArray = $imagesArray;

		if (start < target) {
			newImagesArray.splice(target + 1, 0, newImagesArray[start]);
			newImagesArray.splice(start, 1);
		} else {
			newImagesArray.splice(target, 0, newImagesArray[start]);
			newImagesArray.splice(start + 1, 1);
		}
		$imagesArray = newImagesArray;
		hovering = null;
	};

	const dragstart = (event, i) => {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		const start = i;
		event.dataTransfer.setData('text/plain', start);
	};
</script>

<div class="flex overflow-x-auto w-full justify-center">
	{#each $imagesArray as image, index (image.id)}
		<div
			class="w-20 shadow rounded m-2 group relative cursor-move flex-shrink-0"
			animate:flip={{ duration: 200 }}
			draggable={true}
			on:dragstart={(event) => dragstart(event, index)}
			on:drop|preventDefault={(event) => drop(event, index)}
			ondragover="return false"
			on:dragenter={() => (hovering = index)}
			on:dragleave={() => (hovering = null)}
			class:is-active={hovering === index}
		>
			<img src={image.src} alt="" class="transition-opacity" />
			<button
				class="hidden group-hover:block absolute -top-3 -right-3 rounded-full w-6 h-6 bg-white shadow hover:shadow-lg"
				title="löschen"
				on:click={() =>
					($imagesArray = $imagesArray.filter((existing) => existing.id !== image.id))}
			>
				&times;
			</button>
		</div>
	{/each}
</div>

<style>
	.is-active img {
		@apply opacity-50;
	}
</style>
