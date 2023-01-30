import { derived, writable } from 'svelte/store';

export const fontsByName = writable<Record<string, boolean>>({});

export const fontNames = derived(fontsByName, (mapping) => Object.keys(mapping));

export const selectedFonts = writable<string[]>([]);
