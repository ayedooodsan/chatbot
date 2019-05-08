import { combineReducers } from 'redux';
import { reducer as authReducer } from '../redux/auth';
import { reducer as notifierReducer } from '../redux/notifier';

export default function getReducer() {
  return combineReducers({
    auth: authReducer,
    notifier: notifierReducer
  });
}
