// 查询单个合同信息
export function fetchUploadInfo() {
  return fetch('/qdp/qdp/payment/payment/uploadInfo',
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
  fetchUploadInfo,
};
