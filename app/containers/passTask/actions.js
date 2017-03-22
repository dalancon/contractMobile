import {
  DEFAULT_ACTION, 
  FETCHTASK_ACTION,
  SETTASK_ACTION,
  FETCHCOND_ACTION,
  SETCOND_ACTION,
  TOGGLEOPEN_ACTION,
  SETCURRENT_ACTION,
  SETLOADINGTAIL_ACTION,
  SETREFRESHING_ACTION,
  ETREFRESHING_ACTION,
  SETSELECTINDEX_ACTION,
  SETTIMERANGE_ACTION,
  SETSEARCH_ACTION,
} from './constants';

// 查询任务
export function fetchTask(queryParams) {
  return {
    type: FETCHTASK_ACTION,
    queryParams,
  };
}

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

export function fetchCondition() {
  return {
    type: FETCHCOND_ACTION,
  }
}

export function setCondition(condition) {
  return {
    type: SETCOND_ACTION,
    condition,
  }
}

export function setSelectIndex(index) {
  return {
    type: SETSELECTINDEX_ACTION,
    index,
  }
}

export function setTimeRange(timeRange) {
  return {
    type: SETTIMERANGE_ACTION,
    timeRange,
  }
}

export function setSearch(search) {
  return {
    type: SETSEARCH_ACTION,
    search,
  }
}