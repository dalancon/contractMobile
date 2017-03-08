import { take, call, put, select, takeEvery, cancel } from 'redux-saga/effects';
import { FETCHTASKCOND_ACTION, FETCHTASK_ACTION } from './constants';

import { setTask } from './actions';
import { fetchTask } from '../../apis/task';


export function* fetchTaskSaga() {
  yield takeEvery(FETCHTASK_ACTION, _fetchTask);
}

function* _fetchTask(action) {
  try {
    let result = yield Promise.all([
      fetchTask('todo', action.queryParams),
    ]);

    console.log('_fetchTask', result);

    result = yield result.map((x) => x.json())[0];

    console.log(result);

    yield put(setTask(result.rows, result.total, result.pageNo));
  } catch (err) {
    alert('fetchTaskSaga:error!');
  }
}

// All sagas to be loaded
export default [
  fetchTaskSaga,
];
