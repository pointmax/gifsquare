<script>
	import { imagesArray } from '../stores';
	let files;

	export let imagesSquare = [];

	let CANVAS_WIDTH = 800;
	let CANVAS_HEIGHT = 800;

	const readFiles = async () => {
		if (files?.length) {
			Array.from(files).forEach(async (file) => {
				let imageString = await convertFileToBase64(file);
				toSquare(imageString, (squareUrl) => {
					imagesSquare = [...imagesSquare, squareUrl];
					$imagesArray = imagesSquare;
				});
			});
		}
	};

	const convertFileToBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
		});

	const toSquare = (src, callback) => {
		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
			var dataURL;
			// canvas.height = this.naturalHeight;
			// canvas.width = this.naturalWidth;
			canvas.height = CANVAS_HEIGHT;
			canvas.width = CANVAS_WIDTH;

			var hRatio = canvas.width / this.width;
			var vRatio = canvas.height / this.height;
			var ratio = Math.min(hRatio, vRatio);
			var centerShift_x = (canvas.width - this.width * ratio) / 2;
			var centerShift_y = (canvas.height - this.height * ratio) / 2;

			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'white';
			ctx.fill();

			ctx.drawImage(
				img,
				0,
				0,
				this.width,
				this.height,
				centerShift_x,
				centerShift_y,
				this.width * ratio,
				this.height * ratio
			);
			dataURL = canvas.toDataURL('image/jpeg');
			callback(dataURL);
		};
		img.src = src;
	};
</script>

<div class="flex overflow-x-auto">
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

<pre>{JSON.stringify(files, null, 2)}</pre>

<input multiple type="file" name="file upload" id="" bind:files on:change={readFiles} />

<style>
</style>
