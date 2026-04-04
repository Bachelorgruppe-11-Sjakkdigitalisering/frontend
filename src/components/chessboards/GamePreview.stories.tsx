import type { Meta, StoryObj } from "@storybook/react-vite";

import GamePreview from "./GamePreview";
import { MemoryRouter } from "react-router";

const meta = {
  component: GamePreview,
  title: "Components/Game Preview",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof GamePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gameId: "1",
    loading: false,
    width: 180,
    fen: "rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "00:23",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "00:14",
  },
};

export const Loading: Story = {
  args: {
    gameId: "1",
    loading: true,
    width: 180,
    fen: "rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "00:23",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "00:14",
  },
};
