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

const title = "じゃがりこポテサラ";
const process =
  "1. じゃがりこにお湯を100ccほど注ぐ\n2. 2〜3分ほど待つ\n3. お好みでマヨネーズと胡椒を入れる";
const ingredientsName1 = "じゃがりこ";
const ingredientsQuantity1 = "1個";
const ingredientsName2 = "お湯";
const ingredientsQuantity2 = "100cc";

const commonTestSetup = async (canvas: ReturnType<typeof within>) => {
  const titleInput =
    canvas.getByPlaceholderText("レシピのタイトルを入力して下さい");
  const processInput =
    canvas.getByPlaceholderText("レシピの作り方を書いて下さい");

  const ingredientsNameInput1 = canvas.getAllByPlaceholderText("材料の名前")[0];
  const ingredientsQuantityInput1 = canvas.getAllByPlaceholderText("量")[0];

  await user.type(titleInput, title);
  await user.type(processInput, process);
  await user.type(ingredientsNameInput1, ingredientsName1);
  await user.type(ingredientsQuantityInput1, ingredientsQuantity1);
  await user.click(canvas.getByText("材料を追加"));
  const ingredientsNameInput2 = canvas.getAllByPlaceholderText("材料の名前")[1];
  const ingredientsQuantityInput2 = canvas.getAllByPlaceholderText("量")[1];
  await user.type(ingredientsNameInput2, ingredientsName2);
  await user.type(ingredientsQuantityInput2, ingredientsQuantity2);

  return {
    titleInput,
    processInput,
    ingredientsNameInput1,
    ingredientsQuantityInput1,
  };
};

export const TypeInformation: Story = {
  name: "入力値が正常かどうか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const {
      titleInput,
      processInput,
      ingredientsNameInput1,
      ingredientsQuantityInput1,
    } = await commonTestSetup(canvas);

    expect(titleInput).toHaveValue(title);
    expect(processInput).toHaveValue(process);
    expect(ingredientsNameInput1).toHaveValue(ingredientsName1);
    expect(ingredientsQuantityInput1).toHaveValue(ingredientsQuantity1);
  },
};

export const AddIngredients: Story = {
  name: "材料の追加ボタンが正常に動作するかどうか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await commonTestSetup(canvas);

    const ingredientsNameAllInput =
      canvas.getAllByPlaceholderText("材料の名前");
    const ingredientsQuantityAllInput = canvas.getAllByPlaceholderText("量");
    expect(ingredientsNameAllInput).toHaveLength(2);
    expect(ingredientsQuantityAllInput).toHaveLength(2);
  },
};

export const RemoveIngredients: Story = {
  name: "材料の削除ボタンが正常に動作するか",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await commonTestSetup(canvas);
    await user.click(canvas.getAllByText("削除")[1])
    const ingredientsNameAllInput = canvas.getAllByPlaceholderText("材料の名前");
    const ingredientsQuantityAllInput = canvas.getAllByPlaceholderText("量");
    expect(ingredientsNameAllInput).toHaveLength(1);
    expect(ingredientsQuantityAllInput).toHaveLength(1);
  },
};