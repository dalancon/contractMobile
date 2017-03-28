import {
  DEFAULT_ACTION, LOGIN_ACTION, LOGINSUCCESS_ACTION, SETTAB_ACTION, FETCHUSER_ACTION, SETUSER_ACTION, SETHIDDEN_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  }
}

export function setTab(current) {
  return {
    type: SETTAB_ACTION,
    current,
  };
}

//登录
export function loginAction(url) {
  return {
    type: LOGIN_ACTION,
    url,
  };
}

export function loginSuccess() {
  return {
    type: LOGINSUCCESS_ACTION,
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

export function setHidden(hidden) {
  return {
    type: SETHIDDEN_ACTION,
    hidden,
  }
}
