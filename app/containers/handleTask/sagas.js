import { take, call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { fetchOutUsers } from '../../apis/task';
import { fetchTaskOpioions } from '../../apis/opinion';
import {
  FETCHOUTGOING_ACTION,
  FETCHOPINIONS_ACTION,
} from './constants';

import { 
	setOutgoing,
  setOpinions,
} from './actions';

export function* fetchOutgoingSaga() {
  yield takeEvery(FETCHOUTGOING_ACTION, _fetchOutgoing);
}

export function* fetchOpinionsSaga() {
  yield takeEvery(FETCHOPINIONS_ACTION, _fetchOpinions);
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
    // console.log('action:', action);

    let result = yield Promise.all([
      fetchOutUsers(action.businessId, action.taskId, action.activityId, action.processInstanceId, action.processDefinitionId),
    ]);
    // console.log(result);

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
];
