const fetch = require('./fetch');

const { BASE_SEARCH_URL } = require('./config');


module.exports = function fetchSearchDirect(queryName, value) {
  return fetch(`${BASE_SEARCH_URL}?${queryName}=${encodeURIComponent(value)}`)
    .then(res => res.json());
};

