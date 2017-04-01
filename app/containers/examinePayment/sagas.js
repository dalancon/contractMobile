import { take, call, put, fork, takeLatest } from 'redux-saga/effects';

import { fetchExamineInfo } from '../../apis/invoice';
import { fetchHistory, fetchOutUsers } from '../../apis/task';
import { fetchAssociateFile } from '../../apis/common';
import {
  FETCHTASKHISTORY_ACTION,
  FETCHINVOICEINFO_ACTION,
  FETCHASSOCIATEFILE_ACTION,
} from './constants';

import { 
	setInvoiceInfo,
	setTaskHistory, 
	setAssociateFile,
} from './actions';

import { login } from '../../apis/login';

export function* fetchInvoiceInfoSaga() {
  yield takeLatest(FETCHINVOICEINFO_ACTION, _fetchInfo);
}

export function* fetchTaskHistorySaga() {
  yield takeLatest(FETCHTASKHISTORY_ACTION, _fetchHistory);
}

export function* fetchAssociateFileSaga() {
  yield takeLatest(FETCHASSOCIATEFILE_ACTION, _fetchAssociateFile);
}

function* _fetchAssociateFile(action) {
  try {
    let result = yield Promise.all([
      fetchAssociateFile(action.businessId),
    ]);

    result = yield result.map((x) => x.json())[0];

    yield put(setAssociateFile(result));
  } catch (err) {
    alert('_fetchAssociateFile:error!');
  }
}

function* _fetchHistory(action) {
  try {

    let result = yield Promise.all([
      fetchHistory(action.businessId, action.taskId),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setTaskHistory(result));
  } catch (err) {
    alert('_fetchHistory:error!');
  }
}

function* _fetchInfo(action) {
  try {
    let result = yield Promise.all([
      fetchExamineInfo(action.systemCode, action.poNo, action.invoiceNo),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setInvoiceInfo(result));
  } catch (err) {
    alert('_fetchInfo:error!');
  }
}

// All sagas to be loaded
export default [
  fetchInvoiceInfoSaga,
  fetchAssociateFileSaga,
  fetchTaskHistorySaga,
];
