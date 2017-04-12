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
  SETTASKHISTORY_ACTION,
  SETASSOCIATEFILE_ACTION,
  SETPREVIEW_ACTION,
  HIDEPREVIEW_ACTION,
} from './constants';

const initialState = fromJS({
  current: '1',		//当前显示的Tab
  invoice: {},
  associateFile: [],
  history: [],
  preview: '',
  showPreview: false,
});

function ExamineReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return initialState;
    case SETTAB_ACTION:
      return state.set('current', action.current);
    case SETINVOICEINFO_ACTION:
      return state.set('invoice', action.info);
    case SETTASKHISTORY_ACTION:
      return state.set('history', action.history);
    case SETASSOCIATEFILE_ACTION:
      return state.set('associateFile', action.associateFile);
    case SETPREVIEW_ACTION:
      return state.set('preview', action.preview).set('showPreview', true);
    case HIDEPREVIEW_ACTION:
      return state.set('preview', '').set('showPreview', false);
    default:
      return state;
  }
}

export default ExamineReducer;


