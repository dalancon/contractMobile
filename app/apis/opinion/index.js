// 查询处理意见
export function fetchReportOpinions(businessId, processDefinitionId) {
  return fetch(`/qdp/qdp/payment/bpm/opinion/report?processDefinitionId=${processDefinitionId}&businessId=${businessId}`,
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
  return fetch(`/qdp/qdp/payment/bpm/opinion/examine?processDefinitionId=${processDefinitionId}&businessId=${businessId}`,
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
  fetchReportOpinions,
  fetchExamineOpinions,
};
