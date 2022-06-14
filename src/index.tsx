import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import state from './services/store';
import reportWebVitals from './reportWebVitals';
//--------------------------------------------------------------------------------

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={state}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
