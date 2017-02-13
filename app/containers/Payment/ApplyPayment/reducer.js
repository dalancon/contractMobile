/*
 *
 * ViewContract reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETPAYMENTINFO_ACTION,
  SETVENDORS_ACTION,
  SETUSERS_ACTION,
  SETUPLOADINFO_ACTION,
  SETPOITEM_ACTION,
  SETVALIDSTATUS_ACTION,
  APPLYING_ACTION,
  SETBUSINESSID_ACTION,
} from './constants';

const initialState = fromJS({
  paymentInfo: {},
  vendors: [],
  uploadInfo: {},
  poItem: [],
  users: [],
  businessId: '',
  validStatus: false,
  applying: false,
});

function applyPaymentReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case APPLYING_ACTION:
      return state.set('applying', action.status);
    case SETPAYMENTINFO_ACTION:
      return state.set('paymentInfo', action.info);
    case SETVENDORS_ACTION:
      return state.set('vendors', action.vendors);
    case SETUSERS_ACTION:
      return state.set('users', action.users);
    case SETUPLOADINFO_ACTION:
      return state.set('uploadInfo', action.info);
    case SETPOITEM_ACTION:
      return state.set('poItem', action.poItem);
    case SETVALIDSTATUS_ACTION:
      return state.set('validStatus', action.status);
    case SETBUSINESSID_ACTION:
      return state.set('businessId', action.businessId);
    default:
      return state;
  }
}

export default applyPaymentReducer;
