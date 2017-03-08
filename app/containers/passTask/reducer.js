/*
 *
 * PassTask reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETTAB_ACTION,
} from './constants';

const initialState = fromJS({
  current: 'pass',		//当前显示的Tab
});

function PassTaskReducer(state = initialState, action) {
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

export default PassTaskReducer;


