import { take, call, put, fork, takeLatest } from 'redux-saga/effects';

import {
  FETCHUSER_ACTION, LOGIN_ACTION,
} from './constants';

import { loginSuccess } from './actions';

import { userInfo, login } from '../../apis/login';
import { setUser } from './actions';


export function* fetchUserSaga() {
  yield takeLatest(FETCHUSER_ACTION, _fetchUser);
}

export function* loginSaga() {
  yield takeLatest(LOGIN_ACTION, _login);
}

function* _login(action) {
  try {
    let result = yield Promise.all([
      login(action.url),
    ]);

    console.log('login:', result);

    result = yield result.map((x) => x.json())[0];

    console.log('login:', result);

    if(result) {
      yield put(loginSuccess());
    } 

  } catch (err) {
    alert('_login:error!')
  }
}

function* _fetchUser() {
  try {
    console.log('_fetchUser');

    let result = yield Promise.all([
      userInfo(),
    ]);

    result = yield result.map((x) => x.json())[0];

    console.log(result);

    yield put(setUser(result));
  } catch (err) {
    alert(' _fetchUser:error!');
  }
}

// All sagas to be loaded
export default [
  fetchUserSaga,
  loginSaga,
];

