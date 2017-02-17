'use strict';


import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import reducers from './reducers';

import loginSagas from './containers/login/sagas';


const sagaMiddleware = createSagaMiddleware();

const logger = store => next => action => {
  if(typeof action === 'function') console.log('dispatching a function');
  else console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

let middlewares = [
  logger,
  sagaMiddleware,
];

let createAppStore = applyMiddleware(...middlewares)(createStore);



export default function configureStore(onComplete: (sagaMiddleware)=>void){
  const store = autoRehydrate()(createAppStore)(reducers);
  // let opt = {
  //   storage: AsyncStorage,
  //   transform: [],
  //   //whitelist: ['userStore'],
  // };
 // persistStore(store, opt, onComplete);
  sagaMiddleware.run(...loginSagas);
  return store;
}


