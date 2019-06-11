const fetch = require('./fetch');

const { BASE_SEARCH_URL } = require('./config');


module.exports = function fetchSearchQuery(query, field) {
  const q = encodeURIComponent(query);

  let urlQuery;
  if (field) {
    urlQuery = `?${field}=${q}&advancedSearch=true`; // Using advanced search for case insensitivity
  } else {
    urlQuery = `?q=${q}`;
  }

  return fetch(`${BASE_SEARCH_URL}${urlQuery}`)
    .then(res => res.json())
    .then((data) => {
      return data.results.reduce((accum, bucket) => {
        const items = [...accum.items, ...bucket.items];
        const totalLength = accum.totalLength + bucket.totalLength;
        return { items, totalLength };
      }, { items: [], totalLength: 0 });
    });
};

