import { take, call, put, select, cancel } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOGIN_ACTION, LOGINSUCCESS_ACTION } from './constants';
import { loginSuccess, loginFailed } from './actions';

import { login } from 'apis/login';

export function* loginSaga() {
  yield takeEvery(LOGIN_ACTION, _login);
}

export function* loginSuccessSaga() {
  yield takeEvery(LOGINSUCCESS_ACTION, _loginSuccess);
}

function* _login(action) {
  try {
    let result = yield Promise.all([
      login(action.url),
    ]);

    result = yield result.map((x) => x.json())[0];
    if (result) {
      yield put(loginSuccess());
    } else {
      yield put(loginFailed());
    }
  } catch (err) {
    alert('error!');
  }
}

function* _loginSuccess() {
  sessionStorage.token = Math.random().toString(36).substring(7);
}

// All sagas to be loaded
export default [
  loginSaga,
  loginSuccessSaga,
];
