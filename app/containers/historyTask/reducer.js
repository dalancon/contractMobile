/*
 *
 * HistoryTask reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETTAB_ACTION,
} from './constants';

const initialState = fromJS({
  current: 'history',		//当前显示的Tab
});

function HistoryTaskReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETTAB_ACTION:
      return state.set('current', action.current);
    default:
      return state;
  }
}

export default HistoryTaskReducer;


