/*
 *
 * Layout actions
 *
 */

import {
  DEFAULT_ACTION,
  SETUSER_ACTION,
  FETCHUSER_ACTION,
  INITTOOLBAR_ACTION,
  INITPAGES_ACTION,
  SETTODOTASKCOUNT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// 设置当前登陆人
export function setUser(user) {
  return {
    type: SETUSER_ACTION,
    user,
  };
}

// 获取当前登陆人
export function fetchUser() {
  return {
    type: FETCHUSER_ACTION,
  };
}

// 初始化导航栏
export function initToolbar() {
  return {
    type: INITTOOLBAR_ACTION,
  };
}

// 初始化目录
export function initPages() {
  return {
    type: INITPAGES_ACTION,
  };
}

// 设置待办任务的数量
export function setTodoTaskCount(count) {
  return {
    type: SETTODOTASKCOUNT_ACTION,
    count,
  };
}
