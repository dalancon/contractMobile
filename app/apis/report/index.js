
// 查询打印编码
export function fetchReportCode() {
  return fetch('/qdp/qdp/qdp/permisstion/queryMap.do?strategyId=5&CONTEXT_code=TGPMSREPORTCODE&CONTEXT_notEqualCode=null',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export default {
  fetchReportCode,
};
