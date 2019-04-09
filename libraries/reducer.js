import { combineReducers } from 'redux';
import { reducer as authReducer } from '../redux/auth';

export default function getReducer() {
  return combineReducers({
    auth: authReducer
  });
}
