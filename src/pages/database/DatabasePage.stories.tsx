import type { Meta, StoryObj } from "@storybook/react-vite";
import DatabasePage from "./DatabasePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import { delay, http, HttpResponse } from "msw";
import { userEvent, within } from "storybook/test";

const mockPlayers = [
  { id: 1, name: "Magnus Carlsen" },
  { id: 2, name: "Hikaru Nakamura" },
  { id: 3, name: "Fabiano Caruana" },
];

const mockGames = [
  {
    id: 101,
    white_player_name: "Magnus Carlsen",
    black_player_name: "Hikaru Nakamura",
    result: "1-0",
  },
  {
    id: 102,
    white_player_name: "Fabiano Caruana",
    black_player_name: "Magnus Carlsen",
    result: "1/2-1/2",
  },
  {
    id: 102,
    white_player_name: "Fabiano Caruana",
    black_player_name: "Magnus Carlsen",
    result: "0-1",
  },
];

const DEFAULT_URL = "http://127.0.0.1:8000/";

const meta: Meta<typeof DatabasePage> = {
  title: "Pages/DatabasePage",
  component: DatabasePage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**DatabasePage** allows users to toggle between searching for historical chess games and individual players. 

### Testing Strategy
This component utilizes an internal 300ms debounce to prevent API spam. 
The Storybook setup uses **MSW (Mock Service Worker)** to intercept GET requests and dynamically filter mock data based on URL query parameters. 
**Storybook Interactions (\`play\` functions)** are used to automate user keystrokes, deterministically rendering the "Results Found" and "Empty State" UI variants.
        `,
      },
    },
    msw: {
      handlers: [
        // Intercept the Games Search
        http.get(`${DEFAULT_URL}api/archive/search`, async ({ request }) => {
          const url = new URL(request.url);
          // Read the query parameter
          const playerQuery =
            url.searchParams.get("player")?.toLowerCase() || "";

          // Simulate network delay for realism
          await delay(500);

          if (playerQuery === "error-trigger") {
            return new HttpResponse(null, { status: 500 });
          }

          // Dynamically filter the mock array based on the query
          const filteredGames = mockGames.filter(
            (g) =>
              g.white_player_name.toLowerCase().includes(playerQuery) ||
              g.black_player_name.toLowerCase().includes(playerQuery),
          );

          return HttpResponse.json(filteredGames);
        }),

        // Intercept the Players Search
        http.get(`${DEFAULT_URL}api/players`, async ({ request }) => {
          const url = new URL(request.url);
          const nameQuery = url.searchParams.get("name")?.toLowerCase() || "";

          await delay(500);

          if (nameQuery === "error-trigger") {
            return new HttpResponse(null, { status: 500 });
          }

          const filteredPlayers = mockPlayers.filter((p) =>
            p.name.toLowerCase().includes(nameQuery),
          );

          return HttpResponse.json(filteredPlayers);
        }),
      ],
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
type Story = StoryObj<typeof DatabasePage>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The default, initial state of the page showing all historical games before any search query is entered.",
      },
    },
  },
};

export const SearchWithResults: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Simulates a user typing 'Fabiano' into the search bar. The component's debounce triggers, MSW filters the mock data based on the URL query parameter, and the populated GameCards are rendered.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Find the text input using its aria-label
    const searchInput = canvas.getByRole("searchbox");
    // Simulate typing
    await userEvent.type(searchInput, "Fabiano", { delay: 100 });
  },
};

export const SearchNoResults: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Simulates a search query that yields zero matches, demonstrating the empty state messaging.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole("searchbox");
    await userEvent.type(searchInput, "Kasparov", { delay: 100 });
  },
};
