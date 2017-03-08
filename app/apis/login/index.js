import config from '../constants.js';

export function userInfo() {
  return fetch(`${config.baseUrl}/qdp/qdp/login/user`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    }
  );
}

export function login(url) {

  return fetch(`${config.baseUrl}${url}`,
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
  userInfo,
  login,
};
