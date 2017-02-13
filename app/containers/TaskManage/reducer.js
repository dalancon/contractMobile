/*
 *
 * TaskManage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETTASKCOND_ACTION,
  SETTASK_ACTION,
  SETPROPSELECTED_ACTION,
  SETCURRENT_ACTION,
  SETSEARCH_ACTION,
} from './constants';

const initialState = fromJS({
  links: [{
    url: '/task/todo',
    title: '待办事项',
  }, {
    url: '/task/pass',
    title: '经办事项',
  }, {
    url: '/task/history',
    title: '办结事项',
  }, {
    url: '/task/participant',
    title: '关注事项',
  }],
  task: [],
  page: {
    total: 0,
    current: 1,
    limit: 10, //每页数据数量
  },
  search: '',
  condition: {
    catpath: {},
    common: [],
  },
});

function taskManageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETTASKCOND_ACTION:
      return state.set('condition', action.condition).set('propSelected', action.condition.propSelected);
    case SETTASK_ACTION:
      return state.set('task', action.task).setIn(['page', 'total'], action.total).setIn(['page', 'current'], action.current);
    case SETPROPSELECTED_ACTION:
      return state.setIn(['propSelected'], action.propSelected);
    case SETCURRENT_ACTION:
      return state.setIn(['page', 'current'], action.current);
    case SETSEARCH_ACTION:
      return state.set('search', action.search);
    default:
      return state;
  }
}

export default taskManageReducer;
