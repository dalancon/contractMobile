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
  SETPAYMENTINFO_ACTION,
  SETPOITEM_ACTION,
  SETTASKHISTORY_ACTION,
  SETACCOCIATEFILE_ACTION,
  SHOWFLOWDIAGRAM_ACTION,
  HIDEFLOWDIAGRAM_ACTION,
  SHOWREPORTFORM_ACTION,
  HIDEREPORTFORM_ACTION,
} from './constants';

const initialState = fromJS({
  invoice: {},      // 支付单基本信息
  poItem: [],
  history: [],
  historyLoaded: false,   // 流程历史是否查询完毕
  associateFile: [],
  associateFileLoaded: false,  // 关联文件是否加载完毕
  showFlowDiagram: false,
  showReportForm: false,
});

function PrintPaymentReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SETPAYMENTINFO_ACTION:
      return state.set('invoice', action.info);
    case SETPOITEM_ACTION:
      return state.set('poItem', action.poItem);
    case FETCHTASKHISTORY_ACTION:
      return state.set('historyLoaded', false);
    case SETTASKHISTORY_ACTION:
      return state.set('history', action.history).set('historyLoaded', true);
    case FETCHACCOCIATEFILE_ACTION:
      return state.set('associateFileLoaded', false);
    case SETACCOCIATEFILE_ACTION:
      return state.set('associateFile', action.associateFile).set('associateFileLoaded', true);
    case SHOWFLOWDIAGRAM_ACTION:
      return state.set('showFlowDiagram', true);
    case HIDEFLOWDIAGRAM_ACTION:
      return state.set('showFlowDiagram', false);
    case SHOWREPORTFORM_ACTION:
      return state.set('showReportForm', true);
    case HIDEREPORTFORM_ACTION:
      return state.set('showReportForm', false);
    default:
      return state;
  }
}

export default PrintPaymentReducer;
