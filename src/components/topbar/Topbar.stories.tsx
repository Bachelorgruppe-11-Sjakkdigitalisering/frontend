import type { Meta, StoryObj } from "@storybook/react-vite";
import Topbar from "./Topbar";
import { MemoryRouter } from "react-router";

const meta = {
  component: Topbar,
  title: "Components/Topbar",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sjakk-VM runde 1",
    route: "/",
  },
};

export const LongTitle: Story = {
  args: {
    title: "Herman Lundby-Holen spiller mot Dennis Johansen 2026",
    route: "/",
  },
};
