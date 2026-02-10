import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Navbar from "./Navbar";

const meta = {
  component: Navbar,
  title: "Navbar",
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
