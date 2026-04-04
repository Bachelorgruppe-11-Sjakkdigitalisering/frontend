import type { Meta, StoryObj } from "@storybook/react-vite";
import PlayerStats from "./PlayerStats";

const meta = {
  component: PlayerStats,
  title: "Components/Player Stats",
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    wins: 2,
    draws: 4,
    losses: 1,
    totalGames: 7,
  },
};

export const AllWins: Story = {
  args: {
    wins: 7,
    draws: 0,
    losses: 0,
    totalGames: 7,
  },
};

export const AllDraws: Story = {
  args: {
    wins: 0,
    draws: 7,
    losses: 0,
    totalGames: 7,
  },
};

export const AllLosses: Story = {
  args: {
    wins: 0,
    draws: 0,
    losses: 7,
    totalGames: 7,
  },
};

export const MostWins: Story = {
  args: {
    wins: 20,
    draws: 2,
    losses: 1,
    totalGames: 23,
  },
};

export const MostDraws: Story = {
  args: {
    wins: 2,
    draws: 20,
    losses: 1,
    totalGames: 23,
  },
};

export const MostLosses: Story = {
  args: {
    wins: 2,
    draws: 1,
    losses: 20,
    totalGames: 23,
  },
};

export const ExtremeWinAmount: Story = {
  args: {
    wins: 200,
    draws: 1,
    losses: 1,
    totalGames: 202,
  },
};

export const NoGamesPlayed: Story = {
  args: {
    wins: 0,
    draws: 0,
    losses: 0,
    totalGames: 0,
  },
};
