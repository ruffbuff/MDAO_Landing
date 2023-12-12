const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    stream: 'stream-browserify',
    http: 'stream-http',
    https: 'https-browserify',
    zlib: 'browserify-zlib',
  })
);