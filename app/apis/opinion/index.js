import config from '../constants.js';

//查询当前用户的常用处理意见
export function fetchTaskOpioions() {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/opinion/query`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 查询处理意见
export function fetchReportOpinions(businessId, processDefinitionId) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/opinion/report?processDefinitionId=${processDefinitionId}&businessId=${businessId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 查询审批处理意见
export function fetchExamineOpinions(businessId, processDefinitionId) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/bpm/opinion/examine?processDefinitionId=${processDefinitionId}&businessId=${businessId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export default {
  fetchTaskOpioions,
  fetchReportOpinions,
  fetchExamineOpinions,
};
