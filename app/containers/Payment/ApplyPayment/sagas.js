import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  FETCHPAYMENTINFO_ACTION,
  FETCHVENDORS_ACTION,
  SETVENDORS_ACTION,
  FETCHUSERS_ACTION,
  FETCHUPLOADINFO_ACTION,
  FETCHPOITEM_ACTION,
} from './constants';

import { setPaymentInfo, setVendors, setUsers, setUploadInfo, setPcList, fetchPcList } from './actions';
import { fetchInfo, fetchVendors, fetchPoItem } from 'apis/contract';
import { applyUsers } from 'apis/task';
import { fetchUploadInfo } from 'apis/payment';
// Individual exports for testing
export function* fetchPaymentInfoSaga() {
  yield takeEvery(FETCHPAYMENTINFO_ACTION, _fetchInfo);
}

export function* fetchVendorsSaga() {
  yield takeEvery(FETCHVENDORS_ACTION, _fetchVendors);
}

export function* fetchUsersSaga() {
  yield takeEvery(FETCHUSERS_ACTION, _fetchUsers);
}

export function* fetchUploadInfoSaga() {
  yield takeEvery(FETCHUPLOADINFO_ACTION, _fetchUploadInfo);
}

export function* fetchPcListSaga() {
  yield takeEvery(FETCHPOITEM_ACTION, _fetchPcList);
}

function* _fetchUsers(action) {
  try {
    let result = yield Promise.all([
      applyUsers('informationCenterPayment'),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setUsers(result));
  } catch (err) {
    alert('_fetchUsers:error!');
  }
}

function* _fetchUploadInfo(action) {
  try {
    let result = yield Promise.all([
      fetchUploadInfo(),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setUploadInfo(result));
  } catch (err) {
    alert('_fetchUploadInfo:error!');
  }
}

function* _fetchPcList(action) {
  try {
    let result = yield Promise.all([
      fetchPoItem(action.systemCode, action.poNo),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setPcList(result));
  } catch (err) {
    alert('_fetchPcList:error!');
  }
}

function* _fetchInfo(action) {
  try {
    let result = yield Promise.all([
      fetchInfo(action.systemCode, action.poNo),
    ]);

    result = yield result.map((x) => x.json())[0];
    yield put(setPaymentInfo(result));
  } catch (err) {
    alert('_fetchInfo:error!');
  }
}

function* _fetchVendors(action) {
  try {
    let result = yield Promise.all([
      fetchVendors(action.systemCode, action.poNo),
    ]);
    result = yield result.map((x) => x.json())[0];

    yield put(setVendors(result));
    yield put(fetchPcList(action.systemCode, action.poNo, result[0].company))
  } catch (err) {
    alert('_fetchVendors:error!');
  }
}

// All sagas to be loaded
export default [
  fetchPaymentInfoSaga,
  fetchVendorsSaga,
  fetchUsersSaga,
  fetchUploadInfoSaga,
  fetchPcListSaga,
];
