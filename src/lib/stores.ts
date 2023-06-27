import Fuse from 'fuse.js';
import type { Fonts } from 'figlet';
import { derived, writable } from 'svelte/store';

export interface FigletRecord {
  font: Fonts;
  slug: string;
  selected: boolean;
  searchMatchIndexes: number[];
  hit: boolean;
  preview: string;
}

function makeFontStore() {
  const { subscribe, update, set } = writable<Record<string, FigletRecord>>({});
  const fuse = new Fuse<FigletRecord>([], { includeMatches: true, keys: ['font'] });

  return {
    set,
    update,
    subscribe,
    fuse,
    updateRecord(record: FigletRecord) {
      update(($store) => ({
        ...$store,
        [record.slug]: { ...record }
      }));
    },
    // fuzzy search
    search(searchTerm: string) {
      const searchResultsRaw = fuse.search(searchTerm);
      const searchResults = new Set(searchResultsRaw.map((r) => r.item.slug));

      update(($store) => {
        for (const slug of Object.keys($store)) {
          $store[slug].hit = searchResults.has(slug);
        }
        return { ...$store };
      });
    },
    // initial load data
    seed(fonts: Fonts[]) {
      update(() =>
        fonts
          .map(
            (font) =>
              ({
                font,
                selected: false,
                searchMatchIndexes: [],
                slug: font.toLowerCase().replace(' ', '-'),
                hit: false,
                preview: ''
              } satisfies FigletRecord)
          )
          .reduce((acc, cur) => {
            return { ...acc, [cur.slug]: { ...cur, hit: false } };
          }, {})
      );
    }
  };
}

function makeFontStoreMetadataStore(base: ReturnType<typeof makeFontStore>) {
  return derived(base, ($store) => {
    const corpus = [...Object.values($store)];
    const selections = corpus.filter((v) => v.selected);
    const searchHits = corpus.filter((v) => v.hit);
    return {
      corpus,
      selections,
      searchHits,
      keys: Object.keys($store),
      recordCount: corpus.length,
      searchHitCount: searchHits.length,
      selectionCount: selections.length,
      hasAnySelections: selections.length > 0
    };
  });
}

function makeFigsleyStore() {
  const store = makeFontStore();
  const meta = makeFontStoreMetadataStore(store);
  return {
    fontStore: store,
    fontStoreMeta: meta
  };
}

export const { fontStore, fontStoreMeta } = makeFigsleyStore();
