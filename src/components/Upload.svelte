<script>
	import { imagesArray } from '../stores';
	import { fade } from 'svelte/transition';

	let files;

	let CANVAS_WIDTH = 800;
	let CANVAS_HEIGHT = 800;
	let inputFieldFile;
	let dragenter = false;
	export const uniqueId = () => {
		return Math.random().toString(16).slice(2);
	};

	const readFiles = async () => {
		if (files?.length) {
			Array.from(files).forEach(async (file) => {
				let imageString = await convertFileToBase64(file);
				toSquare(imageString, (squareUrl) => {
					$imagesArray = [...$imagesArray, { src: squareUrl, id: uniqueId() }];
				});
			});
		}
		inputFieldFile.value = null;
		files = null;
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

	const handleFileDrop = (e) => {
		dragenter = false;
		files = dataTransferToFilesArray(e.dataTransfer);
		readFiles();
	};

	export const dataTransferToFilesArray = (dataTransfer) => {
		const files = [];
		if (dataTransfer.items) {
			for (let i = 0; i < dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (dataTransfer.items[i].kind === 'file') {
					files.push(dataTransfer.items[i].getAsFile());
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (let i = 0; i < dataTransfer.files.length; i++) {
				files.push(dataTransfer.files[i]);
			}
		}
		return files;
	};
</script>

<svelte:body
	on:dragenter={(e) => {
		if (e?.dataTransfer?.items?.[0]?.kind === 'file') {
			dragenter = true;
		}
	}} />

{#if dragenter}
	<div
		transition:fade={{ duration: 100 }}
		class="z-50 fixed inset-0 bg-gray-400 bg-opacity-75 flex justify-center items-center text-white"
		on:dragover|preventDefault
		on:drop|preventDefault={handleFileDrop}
		on:dragleave={() => (dragenter = false)}
	>
		drag and drop images here
	</div>
{/if}

<input
	multiple
	type="file"
	name="file upload"
	id="fileUpload"
	accept="image/jpeg,image/png,image/gif,image/tiff,image/webp,image/heic"
	bind:this={inputFieldFile}
	bind:files
	on:change={readFiles}
	class="hidden"
/>

<div class="flex flex-col items-center gap-4">
	{#if !$imagesArray?.length}
		<span class="text-gray-500 text-sm">drag and drop images here</span>
	{/if}
	<label for="fileUpload" class="button">
		Add {#if $imagesArray?.length}more{/if} images
	</label>
</div>
