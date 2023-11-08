import type { Meta, StoryObj } from "@storybook/react";
import DetailRecipe from "../pages/[id]"

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

const recipeData = {
    id: 1,
    recipe_name: "美味しいオムライス",
    process: "テスト",
    image_url: "",
    user_id: 1,
    user_name: "testUser",
    ingredients: [
        {
            name: "卵",
            quantity: "3個"
        },
        {
            name: "ご飯",
            quantity: "200g"
        },
        {
            name: "玉ねぎ",
            quantity: "1個"
        }
    ]
}

const userData = {
  is_login: true,
  user_id: 1,
};

export const Recipe: Story = {
  args: {
    authInfo: userData,
    recipe: recipeData
  },
};
