import { encodeQueryString, convert } from '../../utils/formUtils';
import config from '../constants.js';

// 获取待办事项的数目
export function fetchTodoTaskCount() {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/task/count/todoTask?${new Date().getTime()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 查询任务
export function fetchTask(taskType, queryParams) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/task/query/${taskType}Task?${encodeQueryString(queryParams)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export function applyUsers(appName) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/task/applyUsers?appName=${appName}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export function canWithdraw(taskId, processDefinitionId, activityId) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/task/canWithdraw?taskId=${taskId}&processDefinitionId=${processDefinitionId}&activityId=${activityId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export function fetchHistory(businessId, taskId) {
  taskId = taskId == undefined ? '' : taskId;

  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/task/history?taskId=${taskId}&businessId=${businessId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export function fetchOutUsers(businessId, taskId, activityId, processInstanceId, processDefinitionId) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/task/outUsers?taskId=${taskId}&businessId=${businessId}&activityId=${activityId}&processInstanceId=${processInstanceId}&processDefinitionId=${processDefinitionId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export function completeTask(form) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/task/complete`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: convert(form),
      credentials: 'same-origin',
    }
  );
}

export default {
  applyUsers,
  canWithdraw,
  completeTask,
  fetchTodoTaskCount,
  fetchTask,
  fetchOutUsers,
  fetchHistory,
};
