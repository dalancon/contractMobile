/*
 *
 * ViewContract actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCHPAYMENTINFO_ACTION,
  FETCHVENDORS_ACTION,
  FETCHUSERS_ACTION,
  FETCHUPLOADINFO_ACTION,
  FETCHPOITEM_ACTION,
  SETPAYMENTINFO_ACTION,
  SETVENDORS_ACTION,
  SETUSERS_ACTION,
  SETUPLOADINFO_ACTION,
  SETPOITEM_ACTION,
  SETVALIDSTATUS_ACTION,
  APPLYING_ACTION,
  SETBUSINESSID_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setBusinessId(businessId) {
  return {
    type: SETBUSINESSID_ACTION,
  }
}

export function applying(status) {
  return {
    type: APPLYING_ACTION,
    status,
  }
}

export function setValidStatus(status) {
  return {
    type: SETVALIDSTATUS_ACTION,
    status,
  };
}

// 获取支付单信息
export function fetchPaymentInfo(systemCode, poNo) {
  return {
    type: FETCHPAYMENTINFO_ACTION,
    systemCode,
    poNo,
  };
}

export function setPaymentInfo(info) {
  return {
    type: SETPAYMENTINFO_ACTION,
    info,
  };
}


// 获取承包商信息
export function fetchVendors(systemCode, poNo) {
  return {
    type: FETCHVENDORS_ACTION,
    systemCode,
    poNo,
  };
}

export function setVendors(vendors) {
  return {
    type: SETVENDORS_ACTION,
    vendors,
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
export function fetchPcList(systemCode, poNo, company) {
  return {
    type: FETCHPOITEM_ACTION,
    systemCode,
    poNo,
    company,
  };
}

export function setPcList(poItem) {
  return {
    type: SETPOITEM_ACTION,
    poItem,
  };
}

