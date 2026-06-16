import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept Terms",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Accepted",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    label: "Already Accepted",
    checked: true,
    disabled: true,
  },
};