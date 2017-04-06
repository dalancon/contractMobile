/*
 *
 * Main reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETTAB_ACTION,
  SETUSER_ACTION,
  SETHIDDEN_ACTION,
  SETNETSTATUS_ACTION,
  LOGINSUCCESS_ACTION,
  LOGINOUT_ACTION,
} from './constants';

const initialState = fromJS({
  current: 'todo',		//当前显示的Tab
  loginUser: null,
  hidden: false,    //是否隐藏TABBAR
  history: [],
  logined: false,
  netStatus: 'offline',  //网络状态
});

function MainReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return initialState;
    case SETTAB_ACTION:
      return state.set('current', action.current);
    case SETUSER_ACTION:
      return state.set('loginUser', action.user);
    case SETHIDDEN_ACTION:
      return state.set('hidden', action.hidden);
    case LOGINSUCCESS_ACTION:
      return state.set('logined', true);
    case LOGINOUT_ACTION:
      return state.set('logined', false).set('loginUser', null).set('current', 'todo').delete('oaAccount');
    case SETNETSTATUS_ACTION:
      return state.set('netStatus', action.netStatus);
    default:
      return state;
  }
}

export default MainReducer;


