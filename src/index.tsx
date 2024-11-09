import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const rootEl = import.meta.env.PROD ? (
  <App />
) : (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
root.render(rootEl);

if (!import.meta.env.PROD) {
  reportWebVitals();
}
