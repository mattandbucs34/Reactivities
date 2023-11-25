import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import 'semantic-ui-css/semantic.min.css'
import './app/styles.css';
import { StoreContext, store } from './app/stores/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext value={store}>
      <App />
    </StoreContext>
  </React.StrictMode>,
);
