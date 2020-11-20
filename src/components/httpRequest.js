function httpTest ($http, host, data) {
    return $http({
      method: 'post',
      url: host + '/users/',
      data
    })
  }
  
  // noinspection JSUnusedGlobalSymbols
  export default {
    httpTest
  }