import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { NotificationsProvider } from '@mantine/notifications';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationsProvider position="top-center" zIndex={2077}>
        <App />
      </NotificationsProvider>
    </Provider>
  </React.StrictMode>
);

