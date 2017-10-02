import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import jwtDecode from 'jwt-decode';
import rootReducer from './reducers/reducers';
import * as actions from './actions/actions';
import setAuthorizationToken from './utils/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export const history = syncHistoryWithStore(createBrowserHistory(), store);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  const user = jwtDecode(localStorage.jwtToken);
  user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
  store.dispatch(actions.loginSuccess(user));
}

export default store;
