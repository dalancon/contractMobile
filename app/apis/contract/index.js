import { encodeQueryString } from 'utils/formUtils';

// 查询合同
export function fetchContract(queryParams) {
  return fetch(`/qdp/qdp/payment/contract/query?${encodeQueryString(queryParams)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 查询往来科目
export function fetchAccountingCode(search, systemCode) {
  return fetch(`/qdp/qdp/payment/accountingCode/query?search=${search}&systemCode=${systemCode}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 查询单个合同信息
export function fetchInfo(systemCode, poNo) {
  return fetch(`/qdp/qdp/payment/contract/info?systemCode=${systemCode}&poNo=${poNo}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 查询承包商
export function fetchVendors(systemCode, poNo) {
  return fetch(`/qdp/qdp/payment/contract/vendors?systemCode=${systemCode}&poNo=${poNo}`,
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
export function fetchPoItem(systemCode, poNo) {
  return fetch(`/qdp/qdp/payment/contract/poItem?systemCode=${systemCode}&poNo=${poNo}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

// 查询合同支付历史
export function fetchPaidHistory(systemId, systemCode, poNo) {
  return fetch(`/qdp/qdp/payment/contract/paidHistory?id=${systemId}&code=${systemCode}&poNo=${poNo}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export function isBudgetYear(systemCode, poNo) {
  return fetch(`/qdp/qdp/payment/contract/isBudgetYear?systemCode=${systemCode}&poNo=${poNo}`,
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
  fetchContract,
  fetchAccountingCode,
  fetchInfo,
  fetchVendors,
  fetchPoItem,
  fetchPaidHistory,
  isBudgetYear,
};
