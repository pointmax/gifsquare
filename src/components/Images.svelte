<script>
	import { imagesArray } from '../stores';
	import { flip } from 'svelte/animate';

	let hovering = false;

	const drop = (event, target) => {
		event.dataTransfer.dropEffect = 'move';
		const start = parseInt(event.dataTransfer.getData('text/plain'));
		const newTracklist = $imagesArray;

		if (start < target) {
			newTracklist.splice(target + 1, 0, newTracklist[start]);
			newTracklist.splice(start, 1);
		} else {
			newTracklist.splice(target, 0, newTracklist[start]);
			newTracklist.splice(start + 1, 1);
		}
		$imagesArray = newTracklist;
		hovering = null;
	};

	const dragstart = (event, i) => {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		const start = i;
		event.dataTransfer.setData('text/plain', start);
	};
</script>

<div class="flex overflow-x-auto max-w-full">
	{#each $imagesArray as image, index (image.src)}
		<div
			class="w-20 shadow rounded m-2 group relative cursor-move"
			animate:flip={{ duration: 200 }}
			draggable={true}
			on:dragstart={(event) => dragstart(event, index)}
			on:drop|preventDefault={(event) => drop(event, index)}
			ondragover="return false"
			on:dragenter={() => (hovering = index)}
			on:dragleave={() => (hovering = null)}
			class:is-active={hovering === index}
		>
			<img src={image.src} alt="" />
			<button
				class="hiddens group-hover:block absolute -top-3 -right-3 rounded-full w-6 h-6 bg-white shadow hover:shadow-lg"
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
	.is-active {
		@apply bg-primary-300;
	}
	.is-active img {
		@apply opacity-50;
	}
</style>
