import type { Fonts } from 'figlet';
import { derived, writable } from 'svelte/store';

export interface FigletRecord {
	font: Fonts;
	slug: string;
	selected: boolean;
	searchMatchIndexes: number[];
}

export const fontRecordsByName = writable<Map<Fonts, FigletRecord>>(new Map());
export const fontRecords = derived(fontRecordsByName, (mapping) => Object.values(mapping));
export const fontRecordsSelected = derived(fontRecords, (records) =>
	records.filter((r) => r.selected)
);
