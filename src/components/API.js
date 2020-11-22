/* eslint-disable */

function httpTest ($http, host, data) {
    return $http({
      method: 'post',
      url: host + '/users/',
      data
    })
}

function signInAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: host + '/auth/login',
    data
  })
}

function signUpAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: host + '/users/signup',
    data
  })
}

function checkingOverlapAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: host + '/users/overlap',
    data
  })
}
  
// noinspection JSUnusedGlobalSymbols
export default {
    httpTest,
    signInAPI,
    signUpAPI,
    checkingOverlapAPI
}
