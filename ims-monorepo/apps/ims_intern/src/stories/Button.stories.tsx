import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Button from '../components/InputField/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <Button variant="primary">
      Login
    </Button>
  ),
};

export const Secondary: Story = {
  render: () => (
    <Button variant="secondary">
      Signup
    </Button>
  ),
};

   
  

