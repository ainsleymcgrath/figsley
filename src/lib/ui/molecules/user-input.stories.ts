import type { Meta, StoryObj } from '@storybook/svelte';

import UserInput from './user-input.svelte';
const meta: Meta<UserInput> = {
  component: UserInput,
};
import '../../../app.css';

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/svelte/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    Component: UserInput,
    props: args,
  }),
  props: {
    text: 'it me',
  },
};
