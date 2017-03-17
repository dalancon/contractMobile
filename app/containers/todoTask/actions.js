import {
  DEFAULT_ACTION, 
  FETCHTASK_ACTION,
  SETTASK_ACTION,
  TOGGLEOPEN_ACTION,
  SETCURRENT_ACTION,
  SETLOADINGTAIL_ACTION,
  SETREFRESHING_ACTION,
} from './constants';

// 查询任务
export function fetchTask(queryParams) {
  return {
    type: FETCHTASK_ACTION,
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

export function toggleOpen() {
  return {
    type: TOGGLEOPEN_ACTION,
  }
}

export function setPageNo(pageNo) {
  return {
    type: SETCURRENT_ACTION,
    current: pageNo,
  }
}

export function setLoadingTail(isLoadingTail) {
  return {
    type: SETLOADINGTAIL_ACTION,
    isLoadingTail,
  }
}

export function setRefreshing(refreshing) {
  return {
    type: SETREFRESHING_ACTION,
    refreshing,
  }
}