const _ = require('lodash');


const {
  get,
} = _;

module.exports = function getSlotValue(slot={}) {
  // Check for synonyms
  // NOTE(digia): There is a lot more to resolutions, this is an extremely basic usecase
  const synonym = get(slot, 'resolutions.resolutionsPerAuthority.0.values.0.value.name');
  return synonym ? synonym : slot.value;
};

