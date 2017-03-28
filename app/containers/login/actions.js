import {
  DEFAULT_ACTION,
  LOGIN_ACTION,
  LOGINSUCCESS_ACTION,
  LOGINFAILED_ACTION,
  LOGINOUT_ACTION,
  CLEARMESSAGE_ACTION,
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

export function loginOut() {
  return {
    type: LOGINOUT_ACTION,
  };
}

export function clearMessage() {
  return {
    type: CLEARMESSAGE_ACTION,
  }
}


