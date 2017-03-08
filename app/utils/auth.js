function login (url) {
  var promise = new Promise(function (resolve, reject) {
    var client = new XMLHttpRequest()
    client.open('POST', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()

    function handler () {
      if (this.readyState !== 4) {
        return
      }
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    };
  })

  return promise
}


module.exports = {
  login ,
  getToken: function () {
    return sessionStorage.token
  },
  logout: function (cb) {
    delete sessionStorage.token
    if (cb) cb()
    this.onChange(false)
  },
  loggedIn: function () {
    return !!sessionStorage.token
  },
  onChange: function () {

  }
}
