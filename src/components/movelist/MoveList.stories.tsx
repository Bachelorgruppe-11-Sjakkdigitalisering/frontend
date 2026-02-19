import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import MoveList, { type Move } from "./MoveList";

const meta = {
  component: MoveList,
  title: "Move List",
  tags: ["autodocs"],
  args: {
    onMoveClick: fn(),
  },
} satisfies Meta<typeof MoveList>;

// mock history data
const mockChessHistory: Move[] = [
  {
    san: "e4",
    fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
    color: "w",
  },
  {
    san: "e5",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2",
    color: "b",
  },
  {
    san: "Nf3",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    color: "w",
  },
  {
    san: "Nc6",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    color: "b",
  },
  {
    san: "Bc4",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    color: "w",
  },
  {
    san: "Bc5",
    fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    color: "b",
  },
  {
    san: "c3",
    fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4",
    color: "w",
  },
  {
    san: "Nf6",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5",
    color: "b",
  },
];

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    history: mockChessHistory,
    currentMoveIndex: 3, // Highlights "Nc6"
  },
};
