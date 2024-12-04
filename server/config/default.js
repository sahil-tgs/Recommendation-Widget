// server/config/default.js
const config = {
    myntraHeaders: {
      'x-meta-app': 'channel=web',
      'x-myntraweb': 'Yes',
      'Accept': 'application/json'
    },
    baseUrl: 'https://www.myntra.com/gateway/v2'
  };
  
  module.exports = config;