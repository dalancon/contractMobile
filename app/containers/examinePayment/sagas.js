import { take, call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { fetchExamineInfo } from '../../apis/invoice';
import { fetchHistory, fetchOutUsers } from '../../apis/task';
import { fetchAssociateFile } from '../../apis/common';
import {
  FETCHTASKHISTORY_ACTION,
  FETCHOUTGOING_ACTION,
  FETCHINVOICEINFO_ACTION,
  FETCHACCOCIATEFILE_ACTION,
} from './constants';

import { setInvoiceInfo, setTaskHistory, setTaskOpinion, setAssociateFile, setOutgoing } from './actions';

import { login } from '../../apis/login';// Individual exports for testing

export function* fetchInvoiceInfoSaga() {
  yield takeEvery(FETCHINVOICEINFO_ACTION, _fetchInfo);
}

export function* fetchTaskHistorySaga() {
  yield takeEvery(FETCHTASKHISTORY_ACTION, _fetchHistory);
}

export function* fetchAssociateFileSaga() {
  yield takeEvery(FETCHACCOCIATEFILE_ACTION, _fetchAssociateFile);
}

export function* fetchOutgoingSaga() {
  yield takeEvery(FETCHOUTGOING_ACTION, _fetchOutgoing);
}

function* _fetchOutgoing(action) {
  try {
    let result = yield Promise.all([
      fetchOutUsers(action.businessId, action.taskId, action.activityId, action.processInstanceId, action.processDefinitionId),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setOutgoing(result));
  } catch (err) {
    alert('_fetchOutgoing:error!');
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
  fetchTaskHistorySaga,
  fetchAssociateFileSaga,
  fetchOutgoingSaga,
];
