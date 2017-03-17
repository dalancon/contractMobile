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
  SETCURRENT_ACTION,
  SETLOADINGTAIL_ACTION,
  SETREFRESHING_ACTION,
} from './constants';

const initialState = fromJS({
  current: '1',		//当前显示的Tab
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
});

function TodoTaskReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETTAB_ACTION:
      return state.set('current', action.current);
    case SETTASK_ACTION:
      {
        if(action.current == 1){
          return state.set('task', action.task).setIn(['page', 'total'], action.total).setIn(['page', 'current'], action.current);
        }else{
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
    default:
      return state;
  }
}

export default TodoTaskReducer;


