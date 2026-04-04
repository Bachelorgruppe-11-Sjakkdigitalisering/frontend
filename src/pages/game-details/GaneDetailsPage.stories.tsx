import type { Meta, StoryObj } from "@storybook/react-vite";
import GameDetailsPage from "./GameDetailsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import { http, HttpResponse } from "msw";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockGameData = {
  white_player_name: "Magnus Carlsen",
  black_player_name: "Hikaru Nakamura",
  white_time: "10:00",
  black_time: "09:45",
  pgn: "1. e4 e5 2. Nf3 Nc6 3. Bb5",
};

const meta: Meta<typeof GameDetailsPage> = {
  title: "Pages/GameDetailsPage",
  component: GameDetailsPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/game/123"]}>
          <Routes>
            <Route path="/game/:gameId" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GameDetailsPage>;

export const ArchivedGame: Story = {
  args: {
    isLive: false,
  },
  parameters: {
    msw: {
      handlers: [
        http.get("*/api/archive/123", () => {
          return HttpResponse.json(mockGameData);
        }),
      ],
    },
  },
};

export const LiveGame: Story = {
  args: {
    isLive: true,
  },
  parameters: {
    msw: {
      handlers: [
        http.get("*/api/game/123", () => {
          return HttpResponse.json(mockGameData);
        }),
      ],
    },
  },
};

export const LoadingState: Story = {
  args: {
    isLive: false,
  },
  parameters: {
    msw: {
      handlers: [
        // Simulate an infinite loading state by delaying the response indefinitely
        http.get("*/api/archived/123", async () => {
          await new Promise((resolve) => setTimeout(resolve, 100000));
          return HttpResponse.json({});
        }),
      ],
    },
  },
};

export const ErrorState: Story = {
  args: {
    isLive: false,
  },
  parameters: {
    msw: {
      handlers: [
        http.get("*/api/archived/123", () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};
