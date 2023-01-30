import type { Fonts } from 'figlet';
import { derived, writable } from 'svelte/store';

export const fontsByName = writable<Record<string, boolean>>({});

export const fontNames = derived(fontsByName, (mapping) => Object.keys(mapping));

export const selectedFonts = writable<string[]>([]);

export interface FigletRecord {
	font: Fonts;
	selected: boolean;
	searchMatchIndexes: number[];
}

// initially take all fonts and make them into this
//

export const fontRecordsByName = writable<Partial<Record<Fonts, FigletRecord>>>({});
export const fontRecords = derived(fontRecordsByName, (mapping) => Object.values(mapping));
export const fontRecordsSelected = derived(fontRecords, (records) =>
	records.filter((r) => r.selected)
);
