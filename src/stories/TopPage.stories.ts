import type { Meta, StoryObj } from "@storybook/react";
import index from "../pages/index";

const meta = {
  title: "Example/TopPage",
  component: index,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof index>;

export default meta;
type Story = StoryObj<typeof meta>;

const userData = {
  is_login: true,
  user_id: 1,
};

const recipesData = {
  recipes: [
    {
      id: 1,
      recipe_name: "美味しいオムライス",
      image_url: "",
      user_id: 2,
      user_name: "bbbb",
    },
  ],
};

export const Basic: Story = {
  args: {
    authInfo: userData,
    recipes: recipesData
  },
};
