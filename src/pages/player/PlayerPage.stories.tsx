import type { Meta, StoryObj } from "@storybook/react-vite";
import PlayerPage from "./PlayerPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import { delay, http, HttpResponse } from "msw";
import { userEvent, within } from "storybook/test";

const mockProfileData = {
  player: {
    id: 123,
    name: "Magnus Carlsen",
  },
  stats: {
    wins: 45,
    draws: 20,
    losses: 5,
    total_games: 70,
  },
};

const mockGamesData = [
  {
    id: 101,
    white_player_name: "Magnus Carlsen",
    black_player_name: "Hikaru Nakamura",
    result: "1-0",
  },
  {
    id: 103,
    white_player_name: "Magnus Carlsen",
    black_player_name: "Hikaru Nakamura",
    result: "0-1",
  },
  {
    id: 102,
    white_player_name: "Fabiano Caruana",
    black_player_name: "Magnus Carlsen",
    result: "1/2-1/2",
  },
];

const DEFAULT_URL = "http://127.0.0.1:8000/";

const meta: Meta<typeof PlayerPage> = {
  title: "Pages/PlayerPage",
  component: PlayerPage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
PlayerPage displays a specific player's profile, including their overall win/loss statistics and a historical list of their archived games.

### Testing Strategy
This component extracts the \`playerId\` from the React Router URL parameters and uses it to fire two simultaneous React Query hooks. 
MSW (Mock Service Worker) is used to intercept these requests globally. Interaction tests verify that utility functions, such as copying the Player ID to the clipboard, correctly trigger visual feedback (Alerts).
        `,
      },
    },
    msw: {
      handlers: [
        // Dynamic Mock for the Player Profile
        http.get(`${DEFAULT_URL}api/players/:playerId`, async ({ params }) => {
          const { playerId } = params;

          if (playerId === "player-error") {
            return new HttpResponse(null, { status: 500 });
          }
          if (playerId === "player-loading") {
            await delay("infinite");
            return HttpResponse.json({});
          }

          // Default success response
          return HttpResponse.json(mockProfileData);
        }),

        // Dynamic Mock for the Player's Games
        http.get(
          `${DEFAULT_URL}api/players/:playerId/games`,
          async ({ params }) => {
            const { playerId } = params;

            if (playerId === "player-error") {
              return new HttpResponse(null, { status: 500 });
            }
            if (playerId === "player-loading") {
              await delay("infinite");
              return HttpResponse.json({});
            }
            if (playerId === "player-no-games") {
              return HttpResponse.json([]);
            }

            // Default success response
            return HttpResponse.json(mockGamesData);
          },
        ),
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const mockId = context.parameters.mockId || "123";

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
          <MemoryRouter initialEntries={[`/player/${mockId}`]}>
            <Routes>
              <Route path="/player/:playerId" element={<Story />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof PlayerPage>;

export const Default: Story = {
  parameters: {
    mockId: "player-success",
    docs: {
      description: {
        story:
          "Displays a fully populated player profile with statistics and a list of archived games.",
      },
    },
  },
};

export const CopyPlayerIdInteraction: Story = {
  parameters: {
    mockId: "player-success",
    docs: {
      description: {
        story:
          "Simulates a user clicking the 'Copy' button next to the Player ID. Verifies that the state updates and the success Alert is rendered.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const copyButton = await canvas.findByRole("copy-button");

    await userEvent.click(copyButton, { delay: 300 });
  },
};

export const NoGamesState: Story = {
  parameters: {
    mockId: "player-no-games",
    docs: {
      description: {
        story:
          "Demonstrates the UI state when a player exists in the database, but they have no recorded games.",
      },
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    mockId: "player-error",
    docs: {
      description: {
        story:
          "Demonstrates fault tolerance. If the backend returns a 5xx error or the network fails, the application catches the error.",
      },
    },
  },
};

export const LoadingState: Story = {
  parameters: {
    mockId: "player-loading",
    docs: {
      description: {
        story:
          "Displays the UI feedback (spinners) presented to the user while the network requests are pending.",
      },
    },
  },
};
