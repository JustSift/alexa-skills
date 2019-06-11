const fetch = require('./fetch-search-direct');


module.exports = function fetchSearchDisplayName(displayName) {
  return fetch('displayName', displayName);
};

