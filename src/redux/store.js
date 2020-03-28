import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers';

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export default createStore(
  rootReducer(history),
  applyMiddleware(...middleware)
);