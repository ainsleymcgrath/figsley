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
  const base = writable<Record<string, FigletRecord>>({});

  const fuse = new Fuse<FigletRecord>([], { includeMatches: true, keys: ['font'] });
  const metadata = derived(base, ($store) => {
    const corpus = [...Object.values($store)];
    fuse.setCollection(corpus);

    return {
      corpus,
      fuse,
      keys: Object.keys($store),
      selections: Object.values($store).filter((v) => v.selected)
    };
  });

  return {
    // only read from the metadata
    subscribe: metadata.subscribe,
    // fuzzy search
    search(searchTerm: string) {
      const searchResultsRaw = fuse.search(searchTerm);
      const searchResults = new Set(searchResultsRaw.map((r) => r.item.slug));

      base.update(($store) => {
        for (const slug of Object.keys($store)) {
          $store[slug].hit = searchResults.has(slug);
        }
        return { ...$store };
      });
    },
    // load data
    seed(fonts: Fonts[]) {
      base.update(() =>
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
    },
    // render a preview
    updatePreview(fonts: FigletRecord[], preview: string) {
      base.update(($store) => {
        for (const font of fonts) {
          $store[font.slug].preview = preview;
        }
        return { ...$store };
      });
    }
  };
}

export const fontStore = makeFontStore();
