import {
  SETTAB_ACTION, FETCHUSER_ACTION, SETUSER_ACTION,		
} from './constants';


export function setTab(current) {
  return {
    type: SETTAB_ACTION,
    current,
  };
}

// 获取当前登陆人
export function fetchUser() {
  return {
    type: FETCHUSER_ACTION,
  };
}

// 设置当前登陆人
export function setUser(user) {
  return {
    type: SETUSER_ACTION,
    user,
  };
}
