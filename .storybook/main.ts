import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../packages/shared/ui/**/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/shared/ui/**/src/**/*.mdx',
    '../docs/**/*.mdx',
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  framework: {
    name: '@storybook/react-vite',
    options: { strictMode: false },
  },
  docs: {
    autodocs: true,
  },
};
export default config;
