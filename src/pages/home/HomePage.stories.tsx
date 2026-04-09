import type { Meta, StoryObj } from "@storybook/react-vite";
import HomePage from "./HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
HomePage is the primary landing page of the application.
It displays all ongoing live games as well as having a switch to display latest finished games.
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

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Displays the default state of the Home Page.",
      },
    },
  },
};
