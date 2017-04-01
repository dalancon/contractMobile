import { take, call, put, select, takeLatest, cancel } from 'redux-saga/effects';

import { FETCHCOND_ACTION, FETCHTASK_ACTION } from './constants';
import { setTask, setRefreshing, setCondition } from './actions';
import { fetchTask } from '../../apis/task';
import { fetchQueryCondition } from '../../apis/common';

export function* fetchTaskSaga() {
  yield takeLatest(FETCHTASK_ACTION, _fetchTask);
}

export function* fetchCondSaga() {
  yield takeLatest(FETCHCOND_ACTION, _fetchCond);
}

function* _fetchCond(action) {
  try {
    let result = yield Promise.all([
      fetchQueryCondition('bpm')
    ]);

    result = yield result.map((x) => x.json())[0];

    yield put(setCondition(result));

  } catch (err) {
    alert('_fetchCond:err')
  }
}

function* _fetchTask(action) {
  try {
    yield put(setRefreshing(true));

    let result = yield Promise.all([
      fetchTask('history', action.queryParams),
    ]);

    result = yield result.map((x) => x.json())[0];

    yield [
      put(setTask(result.rows, result.total, result.pageNo)),
      put(setRefreshing(false)),
    ]
  } catch (err) {
    alert('fetchTaskSaga:error!');
  }
}

// All sagas to be loaded
export default [
  fetchTaskSaga,
  fetchCondSaga,
];
