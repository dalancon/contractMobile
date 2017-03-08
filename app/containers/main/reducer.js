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
} from './constants';

const initialState = fromJS({
  current: 'todo',		//当前显示的Tab
  loginUser: null,
});

function MainReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETTAB_ACTION:
      return state.set('current', action.current);
    case SETUSER_ACTION:
      return state.set('loginUser', action.user);
    default:
      return state;
  }
}

export default MainReducer;


