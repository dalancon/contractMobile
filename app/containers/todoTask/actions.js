import {
  DEFAULT_ACTION, 
  FETCHTASK_ACTION,
  SETTASK_ACTION,
  TOGGLEOPEN_ACTION,
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