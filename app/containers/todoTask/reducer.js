/*
 *
 * TodoTask reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETTAB_ACTION,
  SETTASK_ACTION,
  TOGGLEOPEN_ACTION,
} from './constants';

const initialState = fromJS({
  current: '1',		//当前显示的Tab
  task: [],
  search: '',
  timeRange: '',
  open: false,
  position: 'left',
  page: {
    total: 0,
    current: 1,
    limit: 10, //每页数据数量
  },
});

function TodoTaskReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETTAB_ACTION:
      return state.set('current', action.current);
    case SETTASK_ACTION:
      return state.set('task', action.task).setIn(['page', 'total'], action.total).setIn(['page', 'current'], action.current);
    case TOGGLEOPEN_ACTION:
      return state.set('open', true);
    default:
      return state;
  }
}

export default TodoTaskReducer;


