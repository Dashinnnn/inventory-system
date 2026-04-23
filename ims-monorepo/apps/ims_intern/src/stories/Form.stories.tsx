import type { Meta, StoryObj } from '@storybook/react';
import Form from '../components/Molecules/Form';

const meta: Meta<typeof Form> = {
  title: 'Molecules/Form',
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    label: 'Email',
    name: 'email',
    value: '',
    placeholder: 'Enter email',
  },
};
