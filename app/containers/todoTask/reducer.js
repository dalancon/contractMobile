/*
 *
 * TodoTask reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETCOND_ACTION,
  SETTASK_ACTION,
  TOGGLEOPEN_ACTION,
  SETCURRENT_ACTION,
  SETLOADINGTAIL_ACTION,
  SETREFRESHING_ACTION,
  SETSELECTINDEX_ACTION,
  SETTIMERANGE_ACTION,
  SETSEARCH_ACTION,
} from './constants';

const initialState = fromJS({
  task: [],
  search: '',
  timeRange: '',
  open: false,
  position: 'left',
  isLoadingTail: false,   // 是否显示到尾部
  refreshing: false,    // 是否正在刷新中
  page: {
    current: 1,
    limit: 15,    //每页数据数量
  },
  condition: {
    catpath: {},
    common: [],
  },
  selectIndex: null,
});

function TodoTaskReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return initialState;
    case SETCOND_ACTION:
      return state.set('condition', action.condition);
    case SETSELECTINDEX_ACTION:
      return state.set('selectIndex', action.index);
    case SETTASK_ACTION:
      {
        if(action.current == 1) {
          return state.set('task', action.task).setIn(['page', 'total'], action.total).setIn(['page', 'current'], action.current);
        } else {
          return state.set('task', state.get('task').concat(action.task)).setIn(['page', 'total'], action.total).setIn(['page', 'current'], action.current);
        }
      }
    case TOGGLEOPEN_ACTION:
      return state.set('open', true);
    case SETCURRENT_ACTION:
      return state.setIn(['page', 'current'], action.current);
    case SETLOADINGTAIL_ACTION:
      return state.set('isLoadingTail', action.isLoadingTail);
    case SETREFRESHING_ACTION:
      return state.set('refreshing', action.refreshing);
    case SETTIMERANGE_ACTION:
      return state.set('timeRange', action.timeRange);
    case SETSEARCH_ACTION:
      return state.set('search', action.search).setIn([ 'page', 'current' ], 1).setIn(['page', 'limit'], 15);
    default:
      return state;
  }
}

export default TodoTaskReducer;


