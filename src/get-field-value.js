const _ = require('lodash');


const {
  get,
  camelCase,
} = _;

module.exports = function getFieldValue(fieldName, data={}) {
  return get(data, camelCase(fieldName));
};

