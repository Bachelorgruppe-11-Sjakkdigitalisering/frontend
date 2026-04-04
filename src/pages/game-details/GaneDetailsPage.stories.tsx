import type { Meta, StoryObj } from "@storybook/react-vite";
import GameDetailsPage from "./GameDetailsPage";

const meta: Meta<typeof GameDetailsPage> = {
  title: "Pages/GameDetailsPage",
  component: GameDetailsPage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GameDetailsPage>;

export const LiveGame: Story = {
  args: {
    isLive: true,
  },
};
