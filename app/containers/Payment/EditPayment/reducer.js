/*
 *
 *  reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCHTASKHISTORY_ACTION,
  FETCHACCOCIATEFILE_ACTION,
  SETINVOICEINFO_ACTION,
  SETUPLOADINFO_ACTION,
  SETPOITEM_ACTION,
  SETUSERS_ACTION,
  SETACCOCIATEFILE_ACTION,
  SETWITHDRAWSTATUS_ACTION,
  SETOUTGOING_ACTION,
  SETTASKOPINION_ACTION,
  SETTASKHISTORY_ACTION,
  SETVALIDSTATUS_ACTION,
  APPLYING_ACTION,
} from './constants';

const initialState = fromJS({
  invoice : {},  // 支付单信息
  uploadInfo: {},
  associateFile:[],
  poItem:[],
  users:[],
  businessId:'',
  history:[],
  historyLoaded: false,  // 流转历史是否加载完成
  outGoing:[],
  applying: false, //是否正在提交
  validStatus: false,
});

function EditPaymentReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case APPLYING_ACTION:
      return state.set('applying', action.status);
    case SETINVOICEINFO_ACTION:
      return state.set('invoice', action.info);
    case SETPOITEM_ACTION:
      return state.set('poItem', action.poItem);
    case SETUSERS_ACTION:
      return state.set('users', action.users);
    case SETUPLOADINFO_ACTION:
      return state.set('uploadInfo', action.info);
    case SETTASKOPINION_ACTION:
      return state.set('opinions', action.opinions);
    case FETCHTASKHISTORY_ACTION:
      return state.set('loadAssociateFile', false);
    case SETTASKHISTORY_ACTION:
      return state.set('history', action.history).set('historyLoaded', true);
    case FETCHACCOCIATEFILE_ACTION:
      return state.set('associateFileLoaded', false);
    case SETACCOCIATEFILE_ACTION:
      return state.set('associateFile', action.associateFile).set('associateFileLoaded', true);
    case SETOUTGOING_ACTION:
      return state.set('outGoing', action.outGoing);
    case SETVALIDSTATUS_ACTION:
      return state.set('validStatus', action.status);
    default:
      return state;
  }
}

export default EditPaymentReducer;
