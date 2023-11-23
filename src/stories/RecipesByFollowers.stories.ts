import type { Meta, StoryObj } from "@storybook/react";
import index from "../pages/followers/[id]/recipes";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/RecipesByFollowers",
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

const recipes = {
  recipes: [
    {
      id: 1,
      recipe_name: "じゃがりこポテサラ",
      image_url: "",
      user_id: 2,
      user_name: "testUser",
    },
  ],
};

export const Basic: Story = {
  args: {
    recipes
  },
};
