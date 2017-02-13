/*
 *
 * ViewContract actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCHCONTRACTCOND_ACTION,
  SETCONTRACTCOND_ACTION,
  SETPROPSELECTED_ACTION,
  FETCHCONTRACT_ACTION,
  SETCONTRACT_ACTION,
  SETCURRENT_ACTION,
  SETSEARCH_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// 获取合同业务的查询条件
export function fetchContractCondition() {
  return {
    type: FETCHCONTRACTCOND_ACTION,
  };
}

// 设置合同业务的查询条件
export function setContractCondition(condition) {
  return {
    type: SETCONTRACTCOND_ACTION,
    condition,
  };
}

// 设置用户已经选中的条件
export function setPropSelected(propSelected) {
  return {
    type: SETPROPSELECTED_ACTION,
    propSelected,
  };
}

// 查询合同
export function fetchContract(queryParams) {
  return {
    type: FETCHCONTRACT_ACTION,
    queryParams,
  };
}

// 设置合同
export function setContract(contract, total, current) {
  return {
    type: SETCONTRACT_ACTION,
    contract,
    total,
    current,
  };
}

// 设置页面序号
export function setPageNo(pageNo) {
  return {
    type: SETCURRENT_ACTION,
    current: pageNo,
  };
}

// 设置查询
export function setSearch(search) {
  return {
    type: SETSEARCH_ACTION,
    search,
  };
}
