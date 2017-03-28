import { take, call, put, fork, takeLatest } from 'redux-saga/effects';

import {
  LOGIN_ACTION,
  LOGINSUCCESS_ACTION,
} from './constants';

import { loginSuccess, loginFailed } from './actions';

import { login } from '../../apis/login';

// Individual exports for testing
export function* loginSaga() {
  yield takeLatest(LOGIN_ACTION, _login);
}

function* _login(action) {
  try {

    console.log('_login:', action);

    let result = yield Promise.all([
      login(action.url),
    ]);

    result = yield result.map((x) => x.json())[0];

    if(result) {
      yield put(loginSuccess());
    } else {
      yield put(loginFailed('登陆失败'));
    }

  } catch (err) {
    yield put(loginFailed());
  }
}

// All sagas to be loaded
export default [
  loginSaga,
];
