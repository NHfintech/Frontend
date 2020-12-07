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
    url: `${host}/auth/login`,
    data
  })
}

function signUpAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: `${host}/users/signup`,
    data
  })
}

function checkingOverlapAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: `${host}/users/overlap`,
    data
  })
}

function getEventListAPI ($http, host, data) {
  return $http({
    method: 'get',
    url: `${host}/event`,
    params: data
  })
}

function getEventAPI ($http, host, id) {
  return $http({
    method: 'get',
    url: `${host}/event/${id}`,
  })
}

function createEventAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: `${host}/event`,
    data
  })
}

function updateEventAPI ($http, host, id, data) {
  return $http({
    method: 'put',
    url: `${host}/event/${id}`,
    data
  })
}

function destroyEventAPI ($http, host, id) {
  return $http({
    method: 'delete',
    url: `${host}/event/${id}`,
  })
}

function closeEventAPI ($http, host, id) {
  return $http({
    method: 'put',
    url: `${host}/event/close/${id}`,
  })
}

function linkAccountAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: `${host}/fin`,
    data
  })
}

function finTransferAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: `${host}/fin/transfer`,
    data
  })
}

function inviteAPI ($http, host, hash, data) {
  return $http({
    method: 'get',
    url: `${host}/event/invite/${hash}`,
    params: data
  })
}

function getEventBreakdownAPI ($http, host, id) {
  return $http({
    method: 'get',
    url: `${host}/breakdown/event/${id}`,
  })
}

function getMyBreakdownAPI ($http, host) {
  return $http({
    method: 'get',
    url: `${host}/breakdown/sender`
  })
}

function createBreakdownAPI ($http, host, data) {
  return $http({
    method: 'post',
    url: `${host}/breakdown`,
    data
  })
}

function deleteBreakdownAPI ($http, host, id) {
  return $http({
    method: 'delete',
    url: `${host}/breakdown/${id}`,
  })
}
  
// noinspection JSUnusedGlobalSymbols
export default {
    httpTest,
    signInAPI,
    signUpAPI,
    checkingOverlapAPI,
    getEventListAPI,
    getEventAPI,
    createEventAPI,
    updateEventAPI,
    destroyEventAPI,
    closeEventAPI,
    linkAccountAPI,
    finTransferAPI,
    inviteAPI,
    getEventBreakdownAPI,
    getMyBreakdownAPI,
    createBreakdownAPI,
    deleteBreakdownAPI
}
