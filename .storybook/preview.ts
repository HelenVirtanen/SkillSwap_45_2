import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../src/styles/index.css';
import '../src/styles/reset.css';
import '../src/assets/fonts/fonts.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },

  decorators: [
    (Story) =>
      React.createElement(BrowserRouter, null, React.createElement(Story)),
  ],
};

export default preview;
