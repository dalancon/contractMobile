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
  SETTASKOPINION_ACTION,
  SETTASKHISTORY_ACTION,
  SETACCOCIATEFILE_ACTION,
  SETWITHDRAWSTATUS_ACTION,
  SETOUTGOING_ACTION,
  SHOWFLOWDIAGRAM_ACTION,
  HIDEFLOWDIAGRAM_ACTION,
  SHOWTASKHISTORY_ACTION,
  HIDETASKHISTORY_ACTION,
  SHOWTASKHANDLE_ACTION,
  HIDETASKHANDLE_ACTION,
  SHOWPREVIEW_ACTION,
  HIDEPREVIEW_ACTION,
  EXAMINING_ACTION,
} from './constants';

const initialState = fromJS({
  invoice: {},   // 支付单信息
  opinions: [],  // 处理意见
  history: [],   // 流程流转历史
  historyLoaded: false,  // 流转历史是否加载完成
  associateFile: [],  // 关联文件
  associateFileLoaded: false,
  showPreview: false,  // 显示预览文件
  previewFileInfo: {},  // 预览文件信息
  showFlowDiagram: false,
  examining: false,  // 正在进行提交
  outGoing: [],  // 流程流出路径
  showTaskHandle: false, // 显示流程处理对话框
  showHistory: false, // 显示流转历史对话框
});

function ExaminePaymentReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case EXAMINING_ACTION:
      return state.set('examining', action.status);
    case SETINVOICEINFO_ACTION:
      return state.set('invoice', action.info);
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
    case SHOWFLOWDIAGRAM_ACTION:
      return state.set('showFlowDiagram', true);
    case HIDEFLOWDIAGRAM_ACTION:
      return state.set('showFlowDiagram', false);
    case SHOWTASKHISTORY_ACTION:
      return state.set('showHistory', true);
    case HIDETASKHISTORY_ACTION:
      return state.set('showHistory', false);
    case SHOWTASKHANDLE_ACTION:
      return state.set('showTaskHandle', true);
    case HIDETASKHANDLE_ACTION:
      return state.set('showTaskHandle', false);
    case SHOWPREVIEW_ACTION:
      return state.set('showPreview', true).set('previewFileInfo', action.file);
    case HIDEPREVIEW_ACTION:
      return state.set('showPreview', false);
    default:
      return state;
  }
}

export default ExaminePaymentReducer;
