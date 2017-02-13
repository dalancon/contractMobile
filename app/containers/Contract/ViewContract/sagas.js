import { take, call, put, select, takeEvery  } from 'redux-saga/effects';
import { FETCHCONTRACTCOND_ACTION, FETCHCONTRACT_ACTION } from './constants';

import { setContractCondition, setContract } from './actions';
import { fetchContract } from 'apis/contract';
import { fetchQueryCondition } from 'apis/common';

// Individual exports for testing
export function* fetchCondSaga() {
  yield takeEvery(FETCHCONTRACTCOND_ACTION, _fetchCond);
}

export function* fetchContractSaga() {
  yield takeEvery(FETCHCONTRACT_ACTION, _fetchContract);
}

function* _fetchContract(action) {
  try {
    let result = yield Promise.all([
      fetchContract(action.queryParams),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setContract(result.rows, result.total, result.pageNo));
  } catch (err) {
    alert('_fetchContract:error!');
  }
}

function* _fetchCond(action) {
  try {
    let result = yield Promise.all([
      fetchQueryCondition('contract'),
    ]);
    result = yield result.map((x) => x.json())[0];

    console.log(result);
    yield put(setContractCondition(result));
  } catch (err) {
    alert('_fetchCond:error!');
  }
}

// All sagas to be loaded
export default [
  fetchCondSaga,
  fetchContractSaga,
];
