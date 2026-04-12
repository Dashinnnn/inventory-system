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
        placeholder="Enter text here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

