/**
 * @author DucPL
 */

import { combineReducers } from 'redux';
import AuthenticationReducer from '../../../modules/authentication/AuthenticationReducer'

const appReducer = combineReducers({
  AuthenticationReducer
})

// this RootReducer is used to wrap all the reducers into one, and store this inside a store.
const RootReducer = (state, action) => {
  // if (action.type === 'LOG_OUT_SUCCESS') {
  //   state = undefined;
  // }

  return appReducer(state, action);
}

export default RootReducer;

