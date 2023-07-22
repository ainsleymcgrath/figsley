import type { StoryObj } from '@storybook/svelte';

import Idk from './idk.svelte';
export default {
  component: Idk,
};

type Story = StoryObj<Idk>;

export const Primary: Story = {
  render: () => ({
    Component: Idk,
    // props: args,
    props: {
      text: 'it me!',
    },
  }),
};
