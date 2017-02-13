import { take, call, put, select, takeEvery  } from 'redux-saga/effects';
import {   
  FETCHCONTRACTINFO_ACTION,
  FETCHPOITEM_ACTION,
  FETCHPAIDHISTORY_ACTION, 
} from './constants';

import { setContractInfo, setPoItem, setPaidHistory } from './actions';
import { fetchInfo, fetchPoItem, fetchPaidHistory } from 'apis/contract';
import { fetchQueryCondition } from 'apis/common';

// Individual exports for testing
export function* fetchContractInfoSaga() {
  yield takeEvery(FETCHCONTRACTINFO_ACTION, _fetchContractInfo);
}

export function* fetchPoItemSaga() {
  yield takeEvery(FETCHPOITEM_ACTION, _fetchPoItem);
}

export function* fetchPaidHistorySaga() {
  yield takeEvery(FETCHPAIDHISTORY_ACTION, _fetchPaidHistory);
}

function* _fetchPaidHistory(action) {
  try {
    console.log(action);
    let result = yield Promise.all([
      fetchPaidHistory(action.systemId, action.systemCode, action.poNo),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setPaidHistory(result));
  } catch (err) {
    alert('_fetchPaidHistory:error!');
  }
}

function* _fetchContractInfo(action) {
  try {
    let result = yield Promise.all([
      fetchInfo(action.systemCode, action.poNo),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setContractInfo(result));
  } catch (err) {
    alert('_fetchContractInfo:error!');
  }
}

function* _fetchPoItem(action) {
  // try {
    let result = yield Promise.all([
      fetchPoItem(action.systemCode, action.poNo),
    ]);
    result = yield result.map((x) => x.json())[0];

    yield put(setPoItem(result));
  // } catch (err) {
  //   alert('_fetchPoItem:error!');
  // }
}

// All sagas to be loaded
export default [
  fetchContractInfoSaga,
  fetchPoItemSaga,
  fetchPaidHistorySaga,
];
