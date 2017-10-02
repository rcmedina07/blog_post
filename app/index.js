import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';
import Blog from './components/Blog';

require('./index.css');


ReactDOM.render(
  <Provider store={store}>
    <Blog history={history} />
  </Provider>, document.getElementById('app'));
