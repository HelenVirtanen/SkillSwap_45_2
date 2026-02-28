import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store/store.ts';
import { Provider } from 'react-redux';
import { ThemeProvider } from './shared/lib/theme/ThemeProvider.tsx';

import App from './app/App.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
