/*
 *
 * Layout reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SETUSER_ACTION, SETTODOTASKCOUNT_ACTION,
} from './constants';

const initialState = fromJS({
  loginUser: null,
  toolbarBtns: [{
    tip: '我的待办',
    url: '/task/todo',
    icon: 'glyphicon-tasks',
    split: true,
  }, {
    tip: '查看合同',
    url: '/contract',
    icon: 'glyphicon-search',
  }],
  menu: [{
    url: '/task',
    title: '任务中心',
    children: [{
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
  }, {
    url: '/contract',
    title: '合同业务',
  }],
});

function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETUSER_ACTION:
      return state.set('loginUser', action.user);
    case SETTODOTASKCOUNT_ACTION:
      {
        const newState = state.updateIn(['toolbarBtns'], list => list.update(function (x) {
          const toolbarBtns = x.toJS();
          toolbarBtns.map((btn) => {
            if (btn.tip === '我的待办') {
              btn.badge = action.count;
            }
            return btn;
          });
          return fromJS(toolbarBtns);
        }));
        return newState;
      }
    default:
      return state;
  }
}

export default layoutReducer;
