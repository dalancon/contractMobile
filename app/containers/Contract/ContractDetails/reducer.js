/*
 *
 * ContractDetails reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETCONTRACTINFO_ACTION,
  SETPOITEM_ACTION,
  SETPAIDHISTORY_ACTION,
} from './constants';

const initialState = fromJS({
  contractInfo: null,
  poItem: [],
  paidHistory: [],
});

function contractDetailsReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETCONTRACTINFO_ACTION:
      return state.set('contractInfo', action.info);
    case SETPOITEM_ACTION:
      return state.set('poItem', action.poItem);
    case SETPAIDHISTORY_ACTION:
      return state.set('paidHistory', action.history);
      return  
    default:
      return state;
  }
}

export default contractDetailsReducer;
