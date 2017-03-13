/*
 *
 *  actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCHINVOICEINFO_ACTION,
  FETCHTASKOPINION_ACTION,
  FETCHTASKHISTORY_ACTION,
  FETCHACCOCIATEFILE_ACTION,
  FETCHOUTGOING_ACTION,
  SETINVOICEINFO_ACTION,
  SETTASKOPINION_ACTION,
  SETTASKHISTORY_ACTION,
  SETACCOCIATEFILE_ACTION,
  SETOUTGOING_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function examining(status) {
  return {
    type: EXAMINING_ACTION,
    status,
  }
}

// 获取支付单信息
export function fetchInvoiceInfo(systemCode, poNo, invoiceNo) {
  return {
    type: FETCHINVOICEINFO_ACTION,
    systemCode,
    poNo,
    invoiceNo,
  };
}

export function setInvoiceInfo(info) {
  return {
    type: SETINVOICEINFO_ACTION,
    info,
  };
}


// 获取意见
export function fetchTaskOpinion(businessId, processDefinitionId) {
  return {
    type: FETCHTASKOPINION_ACTION,
    businessId,
    processDefinitionId,
  };
}

export function setTaskOpinion(opinions) {
  return {
    type: SETTASKOPINION_ACTION,
    opinions,
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
export function fetchOutgoing(businessId, taskId, activityId, processInstanceId, processDefinitionId) {
  return {
    type: FETCHOUTGOING_ACTION,
    businessId,
    taskId,
    activityId,
    processInstanceId,
    processDefinitionId,
  };
}

export function setOutgoing(outGoing) {
  return {
    type: SETOUTGOING_ACTION,
    outGoing,
  };
}


