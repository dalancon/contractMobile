/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOGIN_ACTION, LOGINSUCCESS_ACTION, LOGINFAILED_ACTION,
} from './constants';

const initialState = fromJS({
  users: [{ oaAccount: 'jinheping', userName: '金和平', position: '信息中心主任' },
    { oaAccount: 'huang_zian', userName: '黄子安', position: '信息中心副主任' },
    { oaAccount: 'zhoujingliang', userName: '周竞亮', position: '信息中心副主任' },
    { oaAccount: 'yang_lei3', userName: '杨镭', position: '信息中心主任助理' },
    { oaAccount: 'xuxia', userName: '徐侠', position: '系统处处长' },
    { oaAccount: 'wang_guoxun', userName: '王国勋', position: '三峡分中心主任' },
    { oaAccount: 'hewen', userName: '何文', position: '金沙江分中心主任' },
    { oaAccount: 'chenr', userName: '陈榕', position: '' },
    { oaAccount: 'li_xianhua', userName: '李仙华', position: '' },
    { oaAccount: 'li_yangzhao', userName: '李旸照', position: '' },
    { oaAccount: 'zhu_qiang', userName: '朱强', position: '' },
    { oaAccount: 'xiao_yunqing', userName: '肖云晴', position: '' },
    { oaAccount: 'chen_ying1', userName: '陈婴', position: '' },
    { oaAccount: 'chenchuhua', userName: '陈楚华', position: '' },
    { oaAccount: 'luo_huiheng', userName: '罗惠恒', position: '' },
    { oaAccount: 'peng_xichun', userName: '彭熙淳', position: '' },
    { oaAccount: 'xu_yi', userName: '徐艺', position: '资产财务部资产与产权管理处副处长' }],
  logining: false,
  login: false,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_ACTION:
      return state.set('logining', true);
    case LOGINSUCCESS_ACTION:
      return state.set('logining', false).set('login', true);
    case LOGINFAILED_ACTION:
      return state.set('logining', false).set('login', false);
    default:
      return state;
  }
}

export default loginPageReducer;
