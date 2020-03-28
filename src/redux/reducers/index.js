import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import locations from './locations';

export default history =>
  combineReducers({
    router: connectRouter(history),
    locations,
  });
