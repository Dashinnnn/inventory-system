import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '../components/Button';
import { Save } from 'lucide-react';
import React from 'react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Individual Button Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Button',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Button',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Button',
  },
};

// Button States
export const DefaultState: Story = {
  args: {
    variant: 'primary',
    state: 'default',
    children: 'Default',
  },
};

export const HoverState: Story = {
  args: {
    variant: 'primary',
    state: 'hover',
    children: 'Hover',
  },
};

export const DisabledState: Story = {
  args: {
    variant: 'primary',
    state: 'disabled',
    children: 'Disabled',
  },
};

// Save Button with Icon
export const SaveButton: Story = {
  args: {
    variant: 'primary',
    icon: Save,
    children: 'Save',
  },
};

// Sizes
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Medium',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small',
  },
};

// Complete Showcase - All Variants
export const AllVariantsShowcase: Story = {
  render: () => (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '48px', 
        fontWeight: 'bold', 
        marginBottom: '40px',
        color: '#000'
      }}>
        Buttons Variants
      </h1>

      {/* Primary Button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Primary button
        </h2>
        <Button variant="primary">Button</Button>
      </div>

      {/* Secondary Button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Secondary button
        </h2>
        <Button variant="secondary">Button</Button>
      </div>

      {/* Tertiary Button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Tertiary Button
        </h2>
        <Button variant="tertiary">Button</Button>
      </div>

      {/* Danger Button (Red) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Danger Button
        </h2>
        <Button variant="danger">Button</Button>
      </div>

      {/* Danger Button (Yellow/Warning) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Danger Button
        </h2>
        <Button variant="warning">Button</Button>
      </div>

      {/* Success Button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '48px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Success Button
        </h2>
        <Button variant="success">Button</Button>
      </div>

      {/* Button States */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Buttons States
        </h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button variant="primary" state="default">Default</Button>
          <Button variant="primary" state="hover">Hover</Button>
          <Button variant="primary" state="disabled">Disabled</Button>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '48px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Save Button
        </h2>
        <Button variant="primary" icon={Save}>Save</Button>
      </div>

      {/* Sizes */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'normal',
          margin: 0,
          minWidth: '300px',
          color: '#000'
        }}>
          Sizes
        </h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary" size="large">Large</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="small">Small</Button>
        </div>
      </div>
    </div>
  ),
};