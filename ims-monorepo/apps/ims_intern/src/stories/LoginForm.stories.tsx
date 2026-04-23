import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from '../components/Organisms/LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};