import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ErrorProvider } from '@/context/ErrorContext';
import { ErrorBoundary } from '@/components/common/error/boundary';
import { BASENAME } from '@/utils/url/url_frontend';
import { store } from '@/store';
import '@/language/i18n';
import App from '@/App';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorProvider>
        <ErrorBoundary
          onError={(error, errorInfo) => {
            console.error('Application Error:', error, errorInfo);
          }}
        >
          <BrowserRouter basename={BASENAME}>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </ErrorProvider>
    </Provider>
  </React.StrictMode>
);