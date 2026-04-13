import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TextArea from '../components/InputField/TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    value:'',
    placeholder: 'Enter your text here...',
  },
};

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <TextArea
        variant="primary"
        placeholder="Enter your text here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};


   
  

