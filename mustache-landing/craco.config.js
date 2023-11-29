const path = require('path');

module.exports = {
  webpack: {
    alias: {
      stream: 'stream-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      zlib: 'browserify-zlib',
    },
  },
};
