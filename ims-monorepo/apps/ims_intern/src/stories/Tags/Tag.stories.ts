import type { Meta, StoryObj } from "@storybook/react";
import Tag from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,

  // ✅ Center like Badge
  parameters: {
    layout: "centered",
  },

  // ✅ Enable docs
  tags: ["autodocs"],

  // ✅ Add controls (like Badge)
  argTypes: {
    label: { control: "text" },
    type: {
      control: "select",
      options: [
        "electronics",
        "sale",
        "featured",
        "instock",
        "lowstock",
        "outofstock",
      ],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

export const Electronics: Story = {
  args: { label: "Electronics", type: "electronics" },
};

export const OnSale: Story = {
  args: { label: "On Sale", type: "sale" },
};

export const Featured: Story = {
  args: { label: "Featured", type: "featured" },
};

export const InStock: Story = {
  args: { label: "In Stock", type: "instock" },
};

export const LowStock: Story = {
  args: { label: "Low Stock", type: "lowstock" },
};

export const OutOfStock: Story = {
  args: { label: "Out of Stock", type: "outofstock" },
};
