/*
 *
 * Examine reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SETTAB_ACTION,
  SETINVOICEINFO_ACTION,
  SETTASKOPINION_ACTION,
  SETTASKHISTORY_ACTION,
  SETACCOCIATEFILE_ACTION,
  SETOUTGOING_ACTION,
} from './constants';

const initialState = fromJS({
  current: '1',		//当前显示的Tab
  invoice: {},
  associateFile: [],
  outGoing: [],
  history: [],
});

function ExamineReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETTAB_ACTION:
      return state.set('current', action.current);
    case SETINVOICEINFO_ACTION:
      return state.set('invoice', action.info);
    case SETTASKHISTORY_ACTION:
      return state.set('history', action.history);
    case SETACCOCIATEFILE_ACTION:
      return state.set('associateFile', action.associateFile);
    case SETOUTGOING_ACTION:
      return state.set('outGoing', action.outGoing);
    default:
      return state;
  }
}

export default ExamineReducer;


