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

const loginUserData = {
  is_login: true,
  user_id: 1,
  user_name: "testuser",
  avatar_url: "",
};

const notLoginUserData = {
  is_login: false
}

const recipesData = {
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

export const AtLogin: Story = {
  args: {
    authInfo: loginUserData,
    recipes: recipesData
  },
};

export const AtNotLogin: Story = {
  args: {
    authInfo: notLoginUserData,
    recipes: recipesData
  }
}