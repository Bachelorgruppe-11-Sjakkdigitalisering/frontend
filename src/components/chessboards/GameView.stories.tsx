import type { Meta, StoryObj } from "@storybook/react-vite";

import GameView from "./GameView";

const meta = {
  component: GameView,
  title: "Game View",
  tags: ["autodocs"],
} satisfies Meta<typeof GameView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    fen: "rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "00:22",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "00:14",
    status: "PENDING",
  },
};

export const WhiteToMove: Story = {
  args: {
    fen: "rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "00:22",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "00:14",
    status: "WHITE_TO_MOVE",
  },
};

export const BlackToMove: Story = {
  args: {
    fen: "rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "00:22",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "00:14",
    status: "BLACK_TO_MOVE",
  },
};
