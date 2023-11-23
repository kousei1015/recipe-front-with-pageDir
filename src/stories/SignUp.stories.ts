import type { Meta, StoryObj } from "@storybook/react";
import index from "../pages/sign_up/index";
import { userEvent as user, within, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/SignUp",
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

export const SignUp: Story = {};

const email = "test@example.com";
const password = "password";
const name = "testUser";

const commonTestSetup = async (canvas: ReturnType<typeof within>) => {
  const emailInput = canvas.getByPlaceholderText("emailを入力してください");
  const passwordInput =
    canvas.getByPlaceholderText("passwordを入力してください");
  const confirmPasswordInput = canvas.getByPlaceholderText("パスワード確認用");
  const nameInput = canvas.getByPlaceholderText("名前を入力して下さい");

  return {
    emailInput,
    passwordInput,
    confirmPasswordInput,
    nameInput,
  };
};

export const typeInfomation: Story = {
  name: "入力値が正常かどうか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { emailInput, passwordInput, confirmPasswordInput, nameInput } =
      await commonTestSetup(canvas);

    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.type(confirmPasswordInput, password);
    await user.type(nameInput, name);
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

      expect(
        canvas.getByTestId("confirm-password-validation")
      ).toHaveTextContent("パスワードは6文字以上入力して下さい");
    });
  },
};
