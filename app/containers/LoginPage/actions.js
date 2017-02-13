/*
 *
 * LoginPage actions
 *
 */

import {
  DEFAULT_ACTION, LOGIN_ACTION, LOGINSUCCESS_ACTION, LOGINFAILED_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

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

export function loginFailed() {
  return {
    type: LOGINFAILED_ACTION,
  };
}
