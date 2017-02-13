import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { fetchExamineInfo } from 'apis/invoice';
import { fetchHistory, fetchOutUsers } from 'apis/task';
import { fetchExamineOpinions } from 'apis/opinion';
import { fetchAssociateFile } from 'apis/common';

import {
  FETCHINVOICEINFO_ACTION,
  FETCHTASKHISTORY_ACTION,
  FETCHTASKOPINION_ACTION,
  FETCHACCOCIATEFILE_ACTION,
  FETCHOUTGOING_ACTION,
} from './constants';
import { setInvoiceInfo, setTaskHistory, setTaskOpinion, setAssociateFile, setOutgoing } from './actions';


// Individual exports for testing
export function* fetchInvoiceInfoSaga() {
  yield takeEvery(FETCHINVOICEINFO_ACTION, _fetchInfo);
}

export function* fetchTaskHistorySaga() {
  yield takeEvery(FETCHTASKHISTORY_ACTION, _fetchHistory);
}

export function* fetchTaskOpinionSaga() {
  yield takeEvery(FETCHTASKOPINION_ACTION, _fetchTaskOpinion);
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

function* _fetchTaskOpinion(action) {
  try {
    let result = yield Promise.all([
      fetchExamineOpinions(action.businessId, action.processDefinitionId),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setTaskOpinion(result));
  } catch (err) {
    alert('_fetchTaskOpinion:error!');
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
  fetchTaskOpinionSaga,
  fetchAssociateFileSaga,
  fetchOutgoingSaga,
];
