import type { Meta, StoryObj } from "@storybook/react-vite";
import GameDetailsPage from "./GameDetailsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import { delay, http, HttpResponse } from "msw";

const liveGameProgression = [
  "1. e4",
  "1. e4 e5",
  "1. e4 e5 2. Bc4",
  "1. e4 e5 2. Bc4 Nc6",
  "1. e4 e5 2. Bc4 Nc6 3. Qh5",
  "1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6",
  "1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7#",
];

const mockGameData = {
  white_player_name: "Magnus Carlsen",
  black_player_name: "Hikaru Nakamura",
  white_time: 5000,
  black_time: 5000,
  pgn: "1. e4 e5 2. Nf3 Nc6 3. Bb5",
};

const URL = "http://127.0.0.1:8000/";

let currentMoveIndex = 0;

const meta: Meta<typeof GameDetailsPage> = {
  title: "Pages/GameDetailsPage",
  component: GameDetailsPage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
GameDetailsPage is the primary component for viewing chess games. 
It handles data fetching, error boundaries, and integration with the chess engine.

### Mocking Architecture (MSW)
To prevent race conditions on the Autodocs page (where all states render simultaneously), 
this setup utilizes a Global MSW Handler routing strategy. Instead of mocking per-story, 
we pass a unique \`mockId\` via the Story Router to dynamically resolve the correct HTTP response.
        `,
      },
    },
    msw: {
      handlers: [
        http.post("/api/chess", async () => {
          await delay(300); // Artificial delay to display Skeleton loaders
          return HttpResponse.json({
            eval: 1.2,
            winChance: 60,
            san: "Nf3",
            move: "g1f3",
            continuationArr: ["d5", "d4", "e6"],
            mate: null,
            error: "",
          });
        }),

        http.get(`${URL}api/archive/:gameId`, async ({ params }) => {
          const { gameId } = params;

          // Route the mock response based on the dynamic ID injected by the Story
          if (gameId === "archive-error") {
            return new HttpResponse(null, { status: 500 });
          }
          if (gameId === "archive-loading") {
            await delay("infinite");
            return HttpResponse.json({});
          }

          // Default success response
          return HttpResponse.json(mockGameData);
        }),

        // Handler for Live Game
        http.get(`${URL}api/game/:gameId`, () => {
          // Construct the payload with the current PGN slice
          const responseData = {
            ...mockGameData,
            pgn: liveGameProgression[currentMoveIndex],
          };

          // Increment the index for the next polling cycle, capping it at checkmate
          if (currentMoveIndex < liveGameProgression.length - 1) {
            currentMoveIndex++;
          }

          return HttpResponse.json(responseData);
        }),
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const mockId = context.parameters.mockId || "123";

      if (mockId === "live-success") {
        currentMoveIndex = 0;
      }

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
            staleTime: 0,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[`/game/${mockId}`]}>
            <Routes>
              <Route path="/game/:gameId" element={<Story />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof GameDetailsPage>;

export const ArchivedGame: Story = {
  args: {
    isLive: false,
  },
  parameters: {
    mockId: "archive-success",
    docs: {
      description: {
        story:
          "Demonstrates the successful rendering of a completed, historical game from the database. The component reads the PGN and initializes the board at the final position.",
      },
    },
  },
};

export const LiveGame: Story = {
  args: {
    isLive: true,
  },
  parameters: {
    mockId: "live-success",
    docs: {
      description: {
        story:
          "Demonstrates an actively ongoing game. In this state, the component actively polls the endpoint for updates and syncs the board to the latest move.",
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    isLive: false,
  },
  parameters: {
    mockId: "archive-loading",
    docs: {
      description: {
        story:
          "Displays the UI feedback (spinners) presented to the user while the network request is pending.",
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    isLive: false,
  },
  parameters: {
    mockId: "archive-error",
    docs: {
      description: {
        story:
          "Demonstrates fault tolerance. If the backend returns a 5xx error or the network fails, the application catches the error without crashing.",
      },
    },
  },
};
