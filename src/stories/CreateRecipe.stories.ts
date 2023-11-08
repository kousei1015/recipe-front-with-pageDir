import type { Meta, StoryObj } from "@storybook/react";
import index from "../pages/create";
import { userEvent as user, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/CreateRecipe",
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

export const CreateRecipe: Story = {};

const commonTestSetup = async (canvas: ReturnType<typeof within>) => {
  const titleInput = canvas.getByPlaceholderText("レシピのタイトルを入力して下さい");
  const processInput = canvas.getByPlaceholderText("レシピの作り方を書いて下さい");

  const ingredientsNameInput = canvas.getByPlaceholderText("材料の名前");
  const ingredientsQuantityInput = canvas.getByPlaceholderText("量");

  return { titleInput, processInput, ingredientsNameInput, ingredientsQuantityInput };
};

export const TypeInformation: Story = {
  name: "入力値が正常かどうか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { titleInput, processInput, ingredientsNameInput, ingredientsQuantityInput } = await commonTestSetup(canvas);

    await user.type(titleInput, "オムライス");
    await user.type(processInput, "テスト");
    await user.type(ingredientsNameInput, "卵");
    await user.type(ingredientsQuantityInput, "1個");

    expect(titleInput).toHaveValue("オムライス");
    expect(processInput).toHaveValue("テスト");
    expect(ingredientsNameInput).toHaveValue("卵");
    expect(ingredientsQuantityInput).toHaveValue("1個");
  },
};

export const AddIngredients: Story = {
  name: "材料の追加ボタンが正常に動作するかどうか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { ingredientsNameInput, ingredientsQuantityInput } = await commonTestSetup(canvas);

    const addIngredientsBtn = canvas.getByText("材料を追加");

    await user.type(ingredientsNameInput, "卵");
    await user.type(ingredientsQuantityInput, "1個");
    await user.click(addIngredientsBtn);

    const ingredientsNameAllInput = canvas.getAllByPlaceholderText("材料の名前");
    const ingredientsQuantityAllInput = canvas.getAllByPlaceholderText("量");
    expect(ingredientsNameAllInput).toHaveLength(2);
    expect(ingredientsQuantityAllInput).toHaveLength(2);
  },
};

export const RemoveIngredients: Story = {
  name: "材料の削除ボタンが正常に動作するか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { ingredientsNameInput, ingredientsQuantityInput } = await commonTestSetup(canvas);

    const addIngredientsBtn = canvas.getByText("材料を追加");
    const removeIngredientsBtn = canvas.getAllByText("削除");

    await user.type(ingredientsNameInput, "卵");
    await user.type(ingredientsQuantityInput, "1個");
    await user.click(addIngredientsBtn);
    await user.click(removeIngredientsBtn[0]);

    const ingredientsNameAllInput = canvas.getAllByPlaceholderText("材料の名前");
    const ingredientsQuantityAllInput = canvas.getAllByPlaceholderText("量");
    expect(ingredientsNameAllInput).toHaveLength(1);
    expect(ingredientsQuantityAllInput).toHaveLength(1);
  },
};