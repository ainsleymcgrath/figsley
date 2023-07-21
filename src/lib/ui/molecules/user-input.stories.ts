import type { Meta, StoryObj } from '@storybook/svelte';
import UserInput from './user-input.svelte';

const meta: Meta<UserInput> = {
  component: UserInput,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => ({
    Component: UserInput,
    props: args,
  }),
  props: {
    text: "'I'm da guy",
  },
};
