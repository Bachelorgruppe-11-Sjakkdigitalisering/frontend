import type { Meta, StoryObj } from "@storybook/react-vite";
import DatabasePage from "./DatabasePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";

const meta: Meta<typeof DatabasePage> = {
  title: "Pages/DatabasePage",
  component: DatabasePage,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
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

export const GameSearch: Story = {
  parameters: {
    docs: {
      description: {
        story: "test",
      },
    },
  },
};
