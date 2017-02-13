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
  FETCHUPLOADINFO_ACTION,
  FETCHOUTGOING_ACTION,
  FETCHACCOCIATEFILE_ACTION,
  FETCHPOITEM_ACTION, 
  FETCHUSERS_ACTION, 

  SETINVOICEINFO_ACTION,
  SETTASKOPINION_ACTION,
  SETTASKHISTORY_ACTION,
  SETUPLOADINFO_ACTION,
  SETOUTGOING_ACTION,
  SETACCOCIATEFILE_ACTION,
  SETPOITEM_ACTION,
  SETUSERS_ACTION,

  APPLYING_ACTION,
  SETVALIDSTATUS_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function applying(status) {
  return {
    type: APPLYING_ACTION,
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

// 获取支付细项
export function fetchPoItem(systemCode, poNo, invoiceNo) {
  return {
    type: FETCHPOITEM_ACTION,
    systemCode,
    poNo,
    invoiceNo,
  };
}

export function setPoItem(poItem) {
  return {
    type: SETPOITEM_ACTION,
    poItem,
  };
}


// 获取支付细项
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

// 获取上传文件相关路径信息
export function fetchUploadInfo() {
  return {
    type: FETCHUPLOADINFO_ACTION,
  };
}

export function setUploadInfo(info) {
  return {
    type: SETUPLOADINFO_ACTION,
    info,
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

// 获取工作流开发发起的目标人员
export function fetchUsers() {
  return {
    type: FETCHUSERS_ACTION,
  };
}

export function setUsers(users) {
  return {
    type: SETUSERS_ACTION,
    users,
  };
}

export function setValidStatus(status) {
  return {
    type: SETVALIDSTATUS_ACTION,
    status,
  };
}


