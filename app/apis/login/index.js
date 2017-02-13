
export function userInfo() {
  return fetch(`/qdp/qdp/login/user?${new Date().getTime()}`,
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
  return fetch(url,
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
