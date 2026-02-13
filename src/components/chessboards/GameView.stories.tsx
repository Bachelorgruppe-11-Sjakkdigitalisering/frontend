import type { Meta, StoryObj } from "@storybook/react-vite";

import GameView from "./GameView";

const meta = {
  component: GameView,
  title: "Game View",
  tags: ["autodocs"],
} satisfies Meta<typeof GameView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StartingPosition: Story = {
  args: {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "10:00",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "10:00",
    status: "PENDING",
  },
};

export const WhiteToMove: Story = {
  args: {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "09:59",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "10:00",
    status: "WHITE_TO_MOVE",
  },
};

export const BlackToMove: Story = {
  args: {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "09:58",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "09:57",
    status: "BLACK_TO_MOVE",
  },
};

export const AdvantageWhite: Story = {
  args: {
    fen: "r1b1kbnr/p1ppqppp/1pn5/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "09:58",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "09:57",
    status: "WHITE_TO_MOVE",
  },
};

export const WinningBlack: Story = {
  args: {
    fen: "2r3k1/pp3ppp/4p3/3pP3/3P4/1P6/P4PPP/2q1R1K1 w - - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "09:58",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "09:57",
    status: "WHITE_TO_MOVE",
  },
};

export const ForcedMateWhite: Story = {
  args: {
    fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "09:58",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "09:57",
    status: "WHITE_TO_MOVE",
  },
};

export const ForcedMateBlack: Story = {
  args: {
    fen: "4r1k1/5ppp/8/8/8/8/5PPP/6K1 b - - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "09:58",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "09:57",
    status: "BLACK_TO_MOVE",
  },
};

export const Stalemate: Story = {
  args: {
    fen: "7k/5Q2/8/8/8/8/8/7K b - - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "01:58",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "00:57",
    status: "FINISHED",
  },
};

export const CheckmateWhite: Story = {
  args: {
    fen: "7k/7Q/7K/8/8/8/8/8 b - - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "01:58",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "00:57",
    status: "FINISHED",
  },
};

export const CheckmateBlack: Story = {
  args: {
    fen: "7K/7q/7k/8/8/8/8/8 w - - 0 1",
    whitePlayerName: "Dennis Johansen",
    whitePlayerTime: "01:58",
    blackPlayerName: "Herman Lundby-Holen",
    blackPlayerTime: "00:57",
    status: "FINISHED",
  },
};
