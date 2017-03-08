import { take, call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import {
  FETCHUSER_ACTION,
} from './constants';

import { loginSuccess, loginFailed } from './actions';

import { userInfo } from '../../apis/login';
import { setUser } from './actions';


export function* fetchUserSaga() {
  yield takeEvery(FETCHUSER_ACTION, _fetchUser);
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
];

