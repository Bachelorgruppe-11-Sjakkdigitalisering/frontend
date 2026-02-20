import type { Meta, StoryObj } from "@storybook/react-vite";
import PlayerCard from "./PlayerCard";

const meta = {
  component: PlayerCard,
  title: "Player Card",
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Herman Lundby-Holen",
    playerId: "1",
  },
};
