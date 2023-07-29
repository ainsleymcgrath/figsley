import type { StoryObj } from '@storybook/svelte';
import FontPicker_2 from './font-picker-2.svelte';
import type { Fonts } from 'figlet';

export default {
  component: FontPicker_2,
};

type Story = StoryObj<FontPicker_2>;
const fontOpts = (
  [
    'Wavy',
    'Weird',
    'Tubular',
    'The Edge',
    'Small Poison',
    'Big Money-se',
    'ANSI Regular',
    'Isometric2',
    'Kban',
    'Jerusalem',
  ] as Fonts[]
).map((font) => ({
  font,
  selected: false,
  searchMatchIndexes: [],
  slug: font.toLowerCase().replace(' ', '-'),
  hit: false,
  preview: '',
}));

export const Primary: Story = {
  render: (args) => ({
    Component: FontPicker_2,
    props: args,
  }),
  args: {
    options: fontOpts,
  },
};
export const SomeSelections: Story = {
  ...Primary,
  args: {
    options: (() => {
      const select = new Set([2, 5, 8]);
      return fontOpts.map((f, i) => (select.has(i) ? { ...f, selected: true } : { ...f }));
    })(),
  },
};
