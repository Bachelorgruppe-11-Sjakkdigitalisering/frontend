import type { Meta, StoryObj } from "@storybook/react-vite";
import PlayerPage from "./PlayerPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";

const meta: Meta<typeof PlayerPage> = {
  title: "Pages/PlayerPage",
  component: PlayerPage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Test
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
          <MemoryRouter initialEntries={[`/player/123`]}>
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

export const Default: Story = {};
