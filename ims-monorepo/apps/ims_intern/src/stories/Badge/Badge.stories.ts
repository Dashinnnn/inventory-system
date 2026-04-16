import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    label: { control: "text" },
    type: {
      control: "select",
      options: [
        "admin",
        "staff",
        "manager",
        "active",
        "inactive",
        "pending",
        "new",
        "urgent",
        "overdue",
        "basic",
        "enterprise",
        "pro",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Admin: Story = {
  args: { label: "Admin", type: "admin" },
};

export const Staff: Story = {
  args: { label: "Staff", type: "staff" },
};

export const Manager: Story = {
  args: { label: "Manager", type: "manager" },
};

export const Active: Story = {
  args: { label: "Active", type: "active" },
};

export const Inactive: Story = {
    args: { label: "Inactive", type: "inactive" },
};

export const Pending: Story = {
  args: { label: "Pending", type: "pending" },
};

export const New: Story = {
  args: { label: "New", type: "new" },
};

export const Urgent: Story = {
  args: { label: "Urgent", type: "urgent" },
};

export const Overdue: Story = {
  args: { label: "Overdue", type: "overdue" },
};

export const Basic: Story = {
  args: { label: "Basic", type: "basic" },
};

export const Enterprise: Story = {
  args: { label: "Enterprise", type: "enterprise" },
};

export const Pro: Story = {
  args: { label: "Pro", type: "pro" },
};