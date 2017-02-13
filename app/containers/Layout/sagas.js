import { take, call, put, select, cancel, takeEvery } from 'redux-saga/effects';
import { FETCHUSER_ACTION, INITTOOLBAR_ACTION } from './constants';
import { setUser, setTodoTaskCount } from './actions';

import request from 'utils/request';
import { userInfo } from 'apis/login';
import { fetchTodoTaskCount } from 'apis/task';

export function* fetchUserSaga() {
  yield takeEvery(FETCHUSER_ACTION, _fetchUser);
}

export function* initToolbarSaga() {
  yield takeEvery(INITTOOLBAR_ACTION, _initToolbar);
}

function* _initToolbar() {
  try {
    let result = yield Promise.all([
      fetchTodoTaskCount(),
    ]);
    result = yield result.map((x) => x.json())[0];
    yield put(setTodoTaskCount(result));
  } catch (err) {
    alert('error!');
  }
}


function* _fetchUser() {
  try {
    let result = yield Promise.all([
      userInfo(),
    ]);
    result = yield result.map((x) => x.json())[0];
    yield put(setUser(result));
  } catch (err) {
    alert('error!');
  }
}

// All sagas to be loaded
export default [
  fetchUserSaga,
  initToolbarSaga,
];
