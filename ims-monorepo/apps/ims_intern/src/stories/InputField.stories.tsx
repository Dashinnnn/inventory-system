import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import InputField from '../components/InputField/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
    value:'',
  },
};

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <InputField
        variant="primary"
        type="text"
        placeholder="Enter text here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Password: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <InputField
        variant="password"
        type="password"
        placeholder="Enter password here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Email: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <InputField
        variant="email"
        type="email"
        placeholder="Enter email here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Number: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <InputField
        variant="number"
        type="number"
        placeholder="Enter number here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};


