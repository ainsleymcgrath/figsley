import type { StoryObj } from '@storybook/svelte';

import UserInput from './user-input.svelte';
export default {
  component: UserInput,
};

type Story = StoryObj<UserInput>;

export const Primary: Story = {
  render: (args) => ({
    Component: UserInput,
    props: args,
  }),
  args: {
    text: 'it me',
    expanded: false,
  },
};

export const Secondary: Story = {
  render: (args) => ({
    Component: UserInput,
    props: args,
  }),
  args: {
    expanded: true,
    text: 'it me',
  },
};
