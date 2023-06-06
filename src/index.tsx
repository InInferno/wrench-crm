import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getPathName } from 'utils/getPathName';
import { store } from './store';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const pathName = getPathName(window.location.pathname.split('/'));

root.render(
  <Provider store={store}>
    <BrowserRouter basename={pathName}>
      <App />
    </BrowserRouter>
  </Provider>
);
