/*
 *
 * TaskManage actions
 *
 */

import {
  DEFAULT_ACTION, 
  FETCHTASKCOND_ACTION, 
  SETTASKCOND_ACTION,
  SETPROPSELECTED_ACTION,
  FETCHTASK_ACTION,
  SETTASK_ACTION,
  SETCURRENT_ACTION,
  SETSEARCH_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// 获取合同业务的查询条件
export function fetchTaskCondition(taskType) {
  return {
    type: FETCHTASKCOND_ACTION,
    taskType,
  };
}

// 设置业务的查询条件
export function setTaskCondition(condition) {
	return {
		type: SETTASKCOND_ACTION,
		condition,
	}
}

// 设置用户已经选中的条件
export function setPropSelected(propSelected) {
  return {
    type: SETPROPSELECTED_ACTION,
    propSelected,
  };
}

// 查询任务
export function fetchTask(taskType, queryParams) {
  return {
    type: FETCHTASK_ACTION,
    taskType,
    queryParams,
  };
}

// 设置合同
export function setTask(task, total, current) {
  return {
    type: SETTASK_ACTION,
    task,
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
