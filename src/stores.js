import { writable } from 'svelte/store';

export let imagesArray = writable([]);

const storedInterval = typeof localStorage !== 'undefined' && localStorage.interval;
export let interval = writable(storedInterval || 1);
interval.subscribe((value) =>
	typeof localStorage !== 'undefined' ? (localStorage.interval = value) : ''
);

export let gifSrc = writable(null);
