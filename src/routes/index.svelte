<script>
	import Download from '../components/Download.svelte';
	import Gif from '../components/Gif.svelte';
	import Images from '../components/Images.svelte';
	import Options from '../components/Options.svelte';
	import Upload from '../components/Upload.svelte';
</script>

<div class="flex py-4 min-h-screen">
	<div
		class="bg-white rounded-lg shadow-md flex-grow container max-w-3xl mx-auto items-center gap-2 justify-center flex flex-col"
	>
		<Gif />
		<Options />

		<Images />
		<div class="flex gap-2">
			<Upload />
			<Download />
		</div>
	</div>
</div>
