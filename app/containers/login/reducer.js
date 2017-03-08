/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETSUBMIT_ACTION,
  LOGIN_ACTION,
  LOGINSUCCESS_ACTION,
  LOGINFAILED_ACTION,
  LOGINOUTSUCCESS_ACTION,
} from './constants';

const initialState = fromJS({
  success: false,
  logining: false,
  message: '',
});

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETSUBMIT_ACTION:
      return fromJS(Object.assign({}, state.toJS(), action.submit));
    case LOGIN_ACTION:
      return fromJS(Object.assign({}, state.toJS(), { logining: true }));
    case LOGINSUCCESS_ACTION:
      return fromJS(Object.assign({}, state.toJS(), { logining: false, success: true }));
    case LOGINFAILED_ACTION:
      return fromJS(Object.assign({}, state.toJS(), { logining: false, success: false, message: action.message }));
    case LOGINOUTSUCCESS_ACTION:
      return initialState;
    default:
      return state;
  }
}

export default LoginReducer;
