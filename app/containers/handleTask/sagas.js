import { take, call, put, fork, takeLatest } from 'redux-saga/effects';
import { completeTask, fetchOutUsers } from '../../apis/task';
import { fetchTaskOpioions } from '../../apis/opinion';
import {
  FETCHOUTGOING_ACTION,
  FETCHOPINIONS_ACTION,
  HANDLETASK_ACTION,
} from './constants';

import { 
	setOutgoing,
  setOpinions,
  setSubmit,
  setComplete,
  setResult
} from './actions';

export function* fetchOutgoingSaga() {
  yield takeLatest(FETCHOUTGOING_ACTION, _fetchOutgoing);
}

export function* fetchOpinionsSaga() {
  yield takeLatest(FETCHOPINIONS_ACTION, _fetchOpinions);
}

export function* handleTaskSaga() {
  yield takeLatest(HANDLETASK_ACTION, _handleTask);
}

function* _handleTask(action) {
  try{

    let result = yield Promise.all([
      completeTask(action.form)
    ]);

    result = yield result.map((x) => x.json())[0];
    
    yield [
      put(setComplete(true)),
      put(setResult(result)),
    ]

  } catch(err) {
    alert('_handleTask:err');
  }
}

function* _fetchOpinions(action) {
  try{

    let result = yield Promise.all([
      fetchTaskOpioions()
    ]);

    result = yield result.map((x) => x.json())[0];
    console.log(result);

    yield put(setOpinions(result));

  } catch(err) {
    alert('_fetchOpinions:err');
  }
}

function* _fetchOutgoing(action) {
  try {
    let result = yield Promise.all([
      fetchOutUsers(action.businessId, action.taskId, action.activityId, action.processInstanceId, action.processDefinitionId),
    ]);

    result = yield result.map((x) => x.json())[0];
    console.log(result);
    yield put(setOutgoing(result));
  } catch (err) {
    alert('_fetchOutgoing:error!');
  }
}

// All sagas to be loaded
export default [
  fetchOutgoingSaga,
  fetchOpinionsSaga,
  handleTaskSaga,
];
