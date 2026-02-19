import type { Meta, StoryObj } from "@storybook/react-vite";
import Evalbar from "./Evalbar";

const meta = {
  component: Evalbar,
  title: "Evalbar",
  decorators: [
    (story) => <div style={{ height: 300, width: 100 }}>{story()}</div>,
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Evalbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    winChance: 50,
    evalLabel: 0,
  },
};
