const path = require('path');
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "storybook-css-modules", 
    '@storybook/addon-jest',
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias["@"] = path.resolve(__dirname, "../src");
    return config;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
