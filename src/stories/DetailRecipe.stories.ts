import type { Meta, StoryObj } from "@storybook/react";
import DetailRecipe from "../pages/[id]";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Recipe",
  component: DetailRecipe,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    nextjs: {
      appDirectory: true,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof DetailRecipe>;

export default meta;
type Story = StoryObj<typeof meta>;

const recipe = {
  id: 1,
  recipe_name: "じゃがりこポテサラ",
  process:
    "1. じゃがりこにお湯を100ほど注ぐ\r\n2. 2〜3分ほど待つ\r\n3. お好みでマヨネーズと胡椒を入れる\r\n",
  image_url: "",
  user_id: 1,
  user_name: "user",
  avatar_url: "",
  ingredients: [
    {
      name: "じゃがりこ",
      quantity: "1個",
    },
    {
      name: "水",
      quantity: "100cc",
    },
  ],
};

const recipeOwnerUser = {
  is_login: true,
  user_id: 1,
  user_name: "user",
  avatar_url: "",
};

const notRecipeOwnerUser = {
  is_login: true,
  user_id: 2,
  user_name: "user",
  avatar_url: "",
};

const notLoginUser = {
  is_login: false
}

export const ownRecipe: Story = {
  args: {
    authInfo: recipeOwnerUser,
    recipe,
  },
};

export const notOwnRecipe: Story = {
  args: {
    authInfo: notRecipeOwnerUser,
    recipe,
  },
};

export const guestUserView: Story = {
  args: {
    authInfo: notLoginUser,
    recipe
  }
}