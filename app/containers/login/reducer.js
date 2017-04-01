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
  LOGINOUT_ACTION,
  CLEARMESSAGE_ACTION,
} from './constants';

const initialState = fromJS({
  success: false,     //登陆是否成功
  logining: false,    //是否在登陆过程中
  message: '',        //提示信息
});

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return initialState;
    case SETSUBMIT_ACTION:
      return fromJS(Object.assign({}, state.toJS(), action.submit));
    case LOGIN_ACTION:
      return fromJS(Object.assign({}, state.toJS(), { logining: true }));
    case LOGINSUCCESS_ACTION:
      return fromJS(Object.assign({}, state.toJS(), { logining: false, success: true }));
    case LOGINFAILED_ACTION:
      return fromJS(Object.assign({}, state.toJS(), { logining: false, success: false, message: action.message }));
    case LOGINOUT_ACTION:
      return initialState;
    case CLEARMESSAGE_ACTION:
      return state.set('message', '');
    default:
      return state;
  }
}

export default LoginReducer;
