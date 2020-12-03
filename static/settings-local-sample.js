/* eslint-disable no-unused-vars */
const apiUrl = 'http://localhost:3000'
const hostUrl = 'http://localhost:8080'

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    apiUrl: apiUrl,
    hostUrl: hostUrl
  }
}