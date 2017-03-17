import { fork } from 'redux-saga/effects';

import loginSagas from '../containers/login/sagas';
import mainSagas from '../containers/main/sagas';
import todoSagas from '../containers/todoTask/sagas';
import examineSagas from '../containers/examinePayment/sagas';
import previewSagas from '../containers/preview/sagas';
import handleTaskSagas from '../containers/handleTask/sagas';

export default function* rootSaga() {
  let sagas = new Array(...loginSagas, ...mainSagas, ...todoSagas, ...examineSagas, ...previewSagas, ...handleTaskSagas);

  return yield sagas.map((x) => fork(x));
}