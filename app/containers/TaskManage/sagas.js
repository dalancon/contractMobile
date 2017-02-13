import { take, call, put, select, takeEvery, cancel } from 'redux-saga/effects';
import { FETCHTASKCOND_ACTION, FETCHTASK_ACTION } from './constants';

import { setTaskCondition, setTask } from './actions';
import { fetchQueryCondition } from 'apis/common';
import { fetchTask } from 'apis/task';

// Individual exports for testing
export function* fetchCondSaga() {
  yield takeEvery(FETCHTASKCOND_ACTION, _fetchCond);
}

export function* fetchTaskSaga() {
  yield takeEvery(FETCHTASK_ACTION, _fetchTask);
}

function* _fetchTask(action) {
  try {
    let result = yield Promise.all([
      fetchTask(action.taskType, action.queryParams),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setTask(result.rows, result.total, result.pageNo));
  } catch (err) {
    alert('TaskManage:fetchTaskSaga:error!');
  }
}

function* _fetchCond(action) {
  try {
    let result = yield Promise.all([
      fetchQueryCondition('bpm'),
    ]);
    result = yield result.map((x) => x.json())[0];
    yield put(setTaskCondition(result));
  } catch (err) {
    alert('TaskManage:fetchCondSaga:error!');
  }
}

// All sagas to be loaded
export default [
  fetchCondSaga,
  fetchTaskSaga,
];
