import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    options: {
      control: "object",
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      { label: "Basic", value: "basic" },
      { label: "Standard", value: "standard" },
      { label: "Premium", value: "premium" },
      { label: "Enterprise", value: "enterprise" },
    ],
  },
};