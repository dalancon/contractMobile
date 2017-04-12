import { take, call, put, fork, takeLatest } from 'redux-saga/effects';

import { fetchExamineInfo } from '../../apis/invoice';
import { fetchHistory, fetchOutUsers } from '../../apis/task';
import { fetchAssociateFile } from '../../apis/common';
import {
  FETCHTASKHISTORY_ACTION,
  FETCHINVOICEINFO_ACTION,
  FETCHASSOCIATEFILE_ACTION,
  FETCHPREVIEW_ACTION,
} from './constants';

import { 
	setInvoiceInfo,
	setTaskHistory, 
	setAssociateFile,
  setPreview,
} from './actions';

import { preview } from '../../apis/common';

import { login } from '../../apis/login';

import database from '../../database';


export function* fetchInvoiceInfoSaga() {
  yield takeLatest(FETCHINVOICEINFO_ACTION, _fetchInfo);
}

export function* fetchTaskHistorySaga() {
  yield takeLatest(FETCHTASKHISTORY_ACTION, _fetchHistory);
}

export function* fetchAssociateFileSaga() {
  yield takeLatest(FETCHASSOCIATEFILE_ACTION, _fetchAssociateFile);
}

export function* previewFileSaga() {
  yield takeLatest(FETCHPREVIEW_ACTION, _previewFile);
}

function* _fetchAssociateFile(action) {
  try {
    let result = yield Promise.all([
      fetchAssociateFile(action.businessId),
    ]);

    result = yield result.map((x) => x.json())[0];

    yield put(setAssociateFile(result));
  } catch (err) {
   // alert('_fetchAssociateFile:error!');
  }
}

function* _fetchHistory(action) {
  try {

    let result = yield Promise.all([
      fetchHistory(action.businessId, action.taskId),
    ]);

    result = yield result.map((x) => x.json())[0];

    // database.write(() => {
    //   database.create('TodoTaskDetails', { businessKey: action.businessId }, true);
    // });

    yield put(setTaskHistory(result));
  } catch (err) {
   // alert('_fetchHistory:error!');
  }
}

function* _fetchInfo(action) {
  try {
    let result = yield Promise.all([
      fetchExamineInfo(action.systemCode, action.poNo, action.invoiceNo),
    ]);

    result = yield result.map((x) => x.json())[0];

    //const info = { businessKey: action.businessKey , ...result };

    // console.log('_fetchInfo:', Object.assign({}, { businessKey: action.businessKey }, result ) );

    database.write(() => {
      // let details = database.objects('TodoTaskDetails');
      // database.delete(details);
      database.create('TodoTaskDetails', Object.assign({}, { businessKey: action.businessKey }, result ), true);
    });

    yield put(setInvoiceInfo(result));
  } catch (err) {
   // alert('_fetchInfo:error!');
  }
}

function* _previewFile(action) {
  try {
    let result = yield Promise.all([
      preview(action.file)
    ]);

    result = yield result.map((x) => x.text())[0];

    yield put(setPreview(result));

  } catch (err) {
    alert('_previewFile:error!');
  }
}


// All sagas to be loaded
export default [
  fetchInvoiceInfoSaga,
  fetchAssociateFileSaga,
  fetchTaskHistorySaga,
  previewFileSaga,
];
