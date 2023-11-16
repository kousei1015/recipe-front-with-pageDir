import type { Meta, StoryObj } from "@storybook/react";
import index from "../pages/profile_edit";
import { userEvent as user, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/ProfileEdit",
  component: index,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    nextjs: {
      appDirectory: true,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof index>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileEdit: Story = {};

export const typeInfomation: Story = {
  name: "入力値が正常かどうか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByPlaceholderText("名前を入力してください");
    const passwordInput =
      canvas.getByPlaceholderText("passwordを入力してください");

    await user.type(nameInput, "testUser");
    await user.type(passwordInput, "password123");

    expect(nameInput).toHaveValue("testUser");
    expect(passwordInput).toHaveValue("password123");
  },
};
