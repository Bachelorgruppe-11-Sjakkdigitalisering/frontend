import type { Meta, StoryObj } from "@storybook/react-vite";
import GameCard from "./GameCard";

const meta = {
  component: GameCard,
  title: "Game Card",
  tags: ["autodocs"],
} satisfies Meta<typeof GameCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WhitePlayerWin: Story = {
  args: {
    whiteName: "Herman Lundby-Holen",
    blackName: "Dennis Johansen",
    whiteWin: true,
    gameId: "1",
  },
};

export const BlackPlayerWin: Story = {
  args: {
    whiteName: "Herman Lundby-Holen",
    blackName: "Dennis Johansen",
    whiteWin: false,
    gameId: "1",
  },
};
