import config from '../constants.js';

// 获取合同的查询条件
export function fetchQueryCondition(conditionType) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/common/commonQuery/${conditionType}?${new Date().getTime()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 获取关联文件
export function fetchAssociateFile(businessId) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/file/associate?businessId=${businessId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

//预览文件
export function preview(filePath) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/file/preview`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `filePath=${filePath}`,
      credentials: 'same-origin',
    }
  );
}

export function queryUser(q) {
  return  fetch(`${config.baseUrl}/qdp/qdp/qdp/userGroup/query.do`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `q=${q}`,
      credentials: 'same-origin',
    }
  );
}



export default {
  fetchQueryCondition,
  fetchAssociateFile,
  queryUser,
  preview,
};
