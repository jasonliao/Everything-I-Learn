import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './containers/App';

import 'materialize-css/dist/js/materialize.min.js';

import 'materialize-css/dist/css/materialize.min.css';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
