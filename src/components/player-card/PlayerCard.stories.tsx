import type { Meta, StoryObj } from "@storybook/react-vite";
import PlayerCard from "./PlayerCard";
import { MemoryRouter } from "react-router";

const meta = {
  component: PlayerCard,
  title: "Components/Player Card",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PlayerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Herman Lundby-Holen",
    playerId: "1",
  },
};
