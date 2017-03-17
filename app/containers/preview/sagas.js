import { take, call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import {
  FETCHPREVIEW_ACTION,
  FETCHSOURCE_ACTION,
  SETPREVIEW_ACTION,
} from './constants';

import {
  setPreview,
  setSource,
} from './actions';

import { preview } from '../../apis/common';
import config from '../../apis/constants.js';

export function* previewFileSaga() {
  yield takeEvery(FETCHPREVIEW_ACTION, _previewFile);
}

export function* fetchSourceSaga() {
  yield takeEvery(FETCHSOURCE_ACTION, _fetchSource);
}

function* _fetchSource(action){
  try {
    let result = yield Promise.all([
      fetch(`${config.baseUrl}/qdp/qdp/${action.path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'same-origin',
      })
    ]);

    result = yield result.map((x) => x.text())[0];

    // console.log('_fetchSource:', result);

    yield put(setSource(result));

  } catch (err) {
    alert('_fetchSource:error!');
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
  previewFileSaga,
  fetchSourceSaga,
];
