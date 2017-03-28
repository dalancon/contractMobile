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
  LOGINSUCCESS_ACTION,
} from './constants';

const initialState = fromJS({
  current: 'todo',		//当前显示的Tab
  loginUser: null,
  hidden: false,  // 是否隐藏TABBAR
  history:[],
});

function MainReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.merge(initialState);
    case SETTAB_ACTION:
      return state.set('current', action.current);
    case SETUSER_ACTION:
      return state.set('loginUser', action.user);
    case SETHIDDEN_ACTION:
      return state.set('hidden', action.hidden);
    case LOGINSUCCESS_ACTION:
      return state.set('logined', true);
    default:
      return state;
  }
}

export default MainReducer;


