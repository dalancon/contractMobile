
export function setToken() {
  sessionStorage.token = Math.random().toString(36).substring(7);
}

export function clearToken() {
  delete sessionStorage.token;
}

export default {
  // login,
  // userInfo,
  setToken,
  getToken() {
    return sessionStorage.token;
  },
  // logout(cb) {
  //   delete sessionStorage.token;
  //   if (cb) cb();
  //   this.onChange(false);
  // },
  loggedIn() {
    return !!sessionStorage.token;
  },
  onChange() {

  },
};
