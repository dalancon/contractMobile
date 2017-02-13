import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  FETCHPAYMENTINFO_ACTION,
  FETCHPOITEM_ACTION,
  FETCHTASKHISTORY_ACTION,
  FETCHACCOCIATEFILE_ACTION,
} from './constants';

import { setPaymentInfo, setPrintPayment, setTaskHistory, setAssociateFile} from './actions';

import { applyUsers, canWithdraw, fetchHistory } from 'apis/task';
import { fetchAssociateFile } from 'apis/common';
import { fetchInfo, fetchPoItem } from 'apis/invoice';
// Individual exports for testing
export function* fetchPaymentInfoSaga() {
  yield takeEvery(FETCHPAYMENTINFO_ACTION, _fetchInfo);
}

export function* fetchPoItemSaga() {
  yield takeEvery(FETCHPOITEM_ACTION, _fetchPoItem);
}

export function* fetchTaskHistorySaga() {
  yield takeEvery(FETCHTASKHISTORY_ACTION, _fetchTaskHistory);
}

export function* fetchAssociateFileSaga() {
  yield takeEvery(FETCHACCOCIATEFILE_ACTION, _fetchAssociateFile);
}

function* _fetchTaskHistory(action) {
  try {
    let result = yield Promise.all([
      fetchHistory(action.businessId, action.taskId),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setTaskHistory(result));
  } catch (err) {
    alert('PrintPaymentSaga:error!');
  }
}

function* _fetchAssociateFile(action) {
  try {
    let result = yield Promise.all([
      fetchAssociateFile(action.businessId),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setAssociateFile(result));
  } catch (err) {
    alert('PrintPaymentSaga:error!');
  }
}

function* _fetchInfo(action) {
  try {
    let result = yield Promise.all([
      fetchInfo(action.systemCode, action.poNo, action.invoiceNo),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setPaymentInfo(result));
  } catch (err) {
    alert('PrintPaymentSaga:error!');
  }
}

function* _fetchPoItem(action) {
  try {
    let result = yield Promise.all([
      fetchPoItem(action.systemCode, action.poNo, action.invoiceNo, 'read'),
    ]);
    result = yield result.map((x) => x.json())[0];

    yield put(setPrintPayment(result));
  } catch (err) {
    alert('PrintPaymentSaga:error!');
  }
}

// All sagas to be loaded
export default [
  fetchPaymentInfoSaga,
  fetchPoItemSaga,
  fetchTaskHistorySaga,
  fetchAssociateFileSaga,
];