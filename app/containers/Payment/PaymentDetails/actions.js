/*
 *
 *  actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCHPAYMENTINFO_ACTION,
  FETCHPOITEM_ACTION,
  FETCHTASKHISTORY_ACTION,
  FETCHACCOCIATEFILE_ACTION,
  FETCHWITHDRAWSTATUS_ACTION,
  SETPAYMENTINFO_ACTION,
  SETPOITEM_ACTION,
  SETTASKHISTORY_ACTION,
  SETACCOCIATEFILE_ACTION,
  SETWITHDRAWSTATUS_ACTION,
  SHOWFLOWDIAGRAM_ACTION,
  HIDEFLOWDIAGRAM_ACTION,
  SHOWREPORTFORM_ACTION,
  HIDEREPORTFORM_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// 获取支付单信息
export function fetchPaymentInfo(systemCode, poNo, invoiceNo) {
  return {
    type: FETCHPAYMENTINFO_ACTION,
    systemCode,
    poNo,
    invoiceNo,
  };
}

export function setPaymentInfo(info) {
  return {
    type: SETPAYMENTINFO_ACTION,
    info,
  };
}


// 获取支付细项
export function fetchPaymentDetails(systemCode, poNo, invoiceNo) {
  return {
    type: FETCHPOITEM_ACTION,
    systemCode,
    poNo,
    invoiceNo,
  };
}

export function setPaymentDetails(poItem) {
  return {
    type: SETPOITEM_ACTION,
    poItem,
  };
}

// 获取流转历史数据
export function fetchTaskHistory(businessId, taskId) {
  return {
    type: FETCHTASKHISTORY_ACTION,
    businessId,
    taskId,
  };
}

export function setTaskHistory(history) {
  return {
    type: SETTASKHISTORY_ACTION,
    history,
  };
}

// 获取关联文件
export function fetchAssociateFile(businessId) {
  return {
    type: FETCHACCOCIATEFILE_ACTION,
    businessId,
  };
}

export function setAssociateFile(associateFile) {
  return {
    type: SETACCOCIATEFILE_ACTION,
    associateFile,
  };
}

// 获取某个公司的合同细项
export function fetchWithDrawStatus(taskId, processDefinitionId, activityId) {
  return {
    type: FETCHWITHDRAWSTATUS_ACTION,
    taskId,
    processDefinitionId,
    activityId,
  };
}

export function setWithDrawStatus(canWithDraw) {
  return {
    type: SETWITHDRAWSTATUS_ACTION,
    canWithDraw,
  };
}

export function showFlowDiagram() {
  return {
    type: SHOWFLOWDIAGRAM_ACTION,
  };
}

export function hideFlowDiagram() {
  return {
    type: HIDEFLOWDIAGRAM_ACTION,
  };
}

export function showReportForm() {
  return {
    type: SHOWREPORTFORM_ACTION,
  };
}

export function hideReportForm() {
  return {
    type: HIDEREPORTFORM_ACTION,
  };
}

