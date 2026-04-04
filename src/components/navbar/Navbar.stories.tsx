import type { Meta, StoryObj } from "@storybook/react-vite";

import Navbar from "./Navbar";
import { MemoryRouter } from "react-router";

const meta = {
  component: Navbar,
  title: "Components/Navbar",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
