import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PublicRoutes from './router';
import store from './features/store';
import DatabaseService from './components/api/api.service';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DatabaseService />
      <PublicRoutes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
