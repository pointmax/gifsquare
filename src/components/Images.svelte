<script>
	import { imagesArray } from '../stores';
</script>

<div class="flex overflow-x-auto max-w-full">
	{#each $imagesArray as image}
		<div class="w-20 shadow rounded m-2 group relative">
			<img src={image} alt="" />
			<button
				class="hiddens group-hover:block absolute -top-3 -right-3 rounded-full w-6 h-6 bg-white shadow hover:shadow-lg"
				title="löschen"
				on:click={() => ($imagesArray = $imagesArray.filter((existing) => existing !== image))}
				>&times;</button
			>
		</div>
	{/each}
</div>
