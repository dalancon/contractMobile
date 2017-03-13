import config from '../constants.js';

// 查询单个支付信息
export function fetchInfo(systemCode, poNo, invoiceNo) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/invoice/info?systemCode=${systemCode}&poNo=${poNo}&invoiceNo=${invoiceNo}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}


// 查询合同细项
export function fetchPoItem(systemCode, poNo, invoiceNo, type) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/invoice/poItem?systemCode=${systemCode}&poNo=${poNo}&invoiceNo=${invoiceNo}&type=${type}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 查询支付单审批信息
export function fetchExamineInfo(systemCode, poNo, invoiceNo) {
  return fetch(`${config.baseUrl}/qdp/qdp/payment/invoice/examineInfo?systemCode=${systemCode}&poNo=${poNo}&invoiceNo=${invoiceNo}`,
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
  fetchInfo,
  fetchPoItem,
  fetchExamineInfo,
};
