/*
 *
 *  actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCHINVOICEINFO_ACTION,
  FETCHTASKHISTORY_ACTION,
  FETCHASSOCIATEFILE_ACTION,
  FETCHPREVIEW_ACTION,
  SETTAB_ACTION,
  SETINVOICEINFO_ACTION,
  SETTASKOPINION_ACTION,
  SETTASKHISTORY_ACTION,
  SETASSOCIATEFILE_ACTION,
  SETPREVIEW_ACTION,
  HIDEPREVIEW_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setTab(current) {
  return {
    type: SETTAB_ACTION,
    current,
  };
}

export function examining(status) {
  return {
    type: EXAMINING_ACTION,
    status,
  }
}

// 获取支付单信息
export function fetchInvoiceInfo(systemCode, poNo, invoiceNo, businessKey) {
  return {
    type: FETCHINVOICEINFO_ACTION,
    systemCode,
    poNo,
    invoiceNo,
    businessKey,
  };
}

export function setInvoiceInfo(info) {
  return {
    type: SETINVOICEINFO_ACTION,
    info,
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
    type: FETCHASSOCIATEFILE_ACTION,
    businessId,
  };
}

export function setAssociateFile(associateFile) {
  return {
    type: SETASSOCIATEFILE_ACTION,
    associateFile,
  };
}

// 获取预览信息
export function fetchPreview(file) {
  return {
    type: FETCHPREVIEW_ACTION,
    file,
  };
}

export function setPreview(preview) {
  return {
    type: SETPREVIEW_ACTION,
    preview,
  };
}

export function hidePreview() {
  return {
    type: HIDEPREVIEW_ACTION,
  };
}



