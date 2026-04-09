import type { Meta, StoryObj } from "@storybook/react-vite";
import HomePage from "./HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import { http, HttpResponse } from "msw";
import { userEvent, within } from "storybook/test";

const mockLiveGames = [
  {
    board_id: "live-1",
    fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
    white_player_name: "Magnus Carlsen",
    black_player_name: "Ding Liren",
    white_time: "10:00",
    black_time: "09:55",
  },
];

const mockArchivedGames = [
  {
    id: 101,
    white_player_name: "Fabiano Caruana",
    black_player_name: "Hikaru Nakamura",
    result: "1/2-1/2",
  },
];

const DEFAULT_URL = "http://127.0.0.1:8000/";

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
HomePage is the primary landing page of the application.
It acts as a dashboard displaying two data streams: currently active live games and recently finished archived games.

### Testing Strategy
Because this component manages multiple React Query hooks simultaneously, Story-level MSW Handlers are used to mock the \`/api/games\` and \`/api/archive/search\` endpoints. Storybook interactions (\`play\` functions) are utilized to verify that the Material-UI ToggleButton correctly switches the active query, unmounts the live boards, and mounts the static archive cards.
        `,
      },
    },
  },
  decorators: [
    (Story) => {
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
          <MemoryRouter initialEntries={[`/`]}>
            <Routes>
              <Route path="*" element={<Story />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const DefaultLiveGames: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The default state upon loading the application. Automatically fetches and displays ongoing live games.",
      },
    },
    msw: {
      handlers: [
        http.get(`${DEFAULT_URL}api/games`, () =>
          HttpResponse.json(mockLiveGames),
        ),
        http.get(`${DEFAULT_URL}api/archive/search`, () =>
          HttpResponse.json(mockArchivedGames),
        ),
      ],
    },
  },
};

export const SwitchToArchive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Simulates a user clicking the 'Nylig spilte partier' toggle. Verifies that the UI correctly fetches and displays the database list.",
      },
    },
    msw: {
      handlers: [
        http.get(`${DEFAULT_URL}api/games`, () =>
          HttpResponse.json(mockLiveGames),
        ),
        http.get(`${DEFAULT_URL}api/archive/search`, () =>
          HttpResponse.json(mockArchivedGames),
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Target the archive toggle button and click it
    const archiveTab = canvas.getByRole("button", {
      name: /nylig spilte partier/i,
    });
    await userEvent.click(archiveTab, { delay: 300 });
  },
};
