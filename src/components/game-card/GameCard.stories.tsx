import type { Meta, StoryObj } from "@storybook/react-vite";
import GameCard from "./GameCard";

const meta = {
  component: GameCard,
  title: "Components/Game Card",
  tags: ["autodocs"],
} satisfies Meta<typeof GameCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WhitePlayerWin: Story = {
  args: {
    whiteName: "Herman Lundby-Holen",
    blackName: "Dennis Johansen",
    result: "1-0",
    gameId: "1",
  },
};

export const BlackPlayerWin: Story = {
  args: {
    whiteName: "Herman Lundby-Holen",
    blackName: "Dennis Johansen",
    result: "0-1",
    gameId: "1",
  },
};

export const IsDraw: Story = {
  args: {
    whiteName: "Herman Lundby-Holen",
    blackName: "Dennis Johansen",
    result: "1/2-1/2",
    gameId: "1",
  },
};
