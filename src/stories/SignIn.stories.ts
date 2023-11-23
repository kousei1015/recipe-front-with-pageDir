import type { Meta, StoryObj } from "@storybook/react";
import index from "../pages/sign_in/index";
import { userEvent as user, within, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/SignIn",
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

export const SignIn: Story = {};

export const typeInfomation: Story = {
  name: "入力値が正常かどうか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText("emailを入力してください");
    const passwordInput =
      canvas.getByPlaceholderText("passwordを入力してください");

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  },
};

export const validationCheck: Story = {
  name: "バリデーションの確認",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await user.click(canvas.getByRole("button"));

    await waitFor(() => {
      expect(canvas.getByTestId("email-validation")).toHaveTextContent(
        "正しいメールアドレスを入力して下さい"
      );

      expect(canvas.getByTestId("password-validation")).toHaveTextContent(
        "パスワードは6文字以上入力して下さい"
      );
    });
  },
};
