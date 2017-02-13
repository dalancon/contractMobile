/*
 *
 * ViewContract reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETCONTRACTCOND_ACTION,
  SETCONTRACT_ACTION,
  SETPROPSELECTED_ACTION,
  SETCURRENT_ACTION,
  SETSEARCH_ACTION,
} from './constants';

const initialState = fromJS({
  contract: [],
  page: {
    total: 0,
    current: 1,
    limit: 10, //每页数据数量
  },
  search: '',
  condition: {
    catpath: {},
    common: [],
  },
});

function viewContractReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETCONTRACTCOND_ACTION:
      return state.set('condition', action.condition).set('propSelected', action.condition.propSelected);
    case SETCONTRACT_ACTION:
      return state.set('contract', action.contract).setIn(['page', 'total'], action.total).setIn(['page', 'current'], action.current);
    case SETPROPSELECTED_ACTION:
      return state.setIn(['propSelected'], action.propSelected);
    case SETCURRENT_ACTION:
      return state.setIn(['page', 'current'], action.current);
    case SETSEARCH_ACTION:
      return state.set('search', action.search);
    default:
      return state;
  }
}

export default viewContractReducer;
