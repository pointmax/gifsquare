import { writable } from 'svelte/store';

export let imagesArray = writable([]);

export let interval = writable(1);

export let gifSrc = writable(null);
