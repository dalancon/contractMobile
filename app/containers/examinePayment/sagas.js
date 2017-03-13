import { take, call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import {
  FETCHTASKHISTORY_ACTION,
  FETCHOUTGOING_ACTION,
  FETCHINVOICEINFO_ACTION,
  FETCHACCOCIATEFILE_ACTION,
} from './constants';

import { } from './actions';

import { login } from '../../apis/login';