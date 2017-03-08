import {
  DEFAULT_ACTION, LOGIN_ACTION, LOGINSUCCESS_ACTION, LOGINFAILED_ACTION,
} from './constants';


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

export function loginFailed(message) {
  return {
    type: LOGINFAILED_ACTION,
    message,
  };
}

