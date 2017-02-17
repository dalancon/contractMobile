import { take, call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import {
  LOGIN_ACTION,
  LOGINSUCCESS_ACTION,
} from './constants';

// Individual exports for testing
export function* loginSaga() {
  yield* takeEvery(LOGIN_ACTION, _login);
}

function* _login() {
  yield put({ type: LOGINSUCCESS_ACTION });
}


// All sagas to be loaded
export default [
  loginSaga,
];
