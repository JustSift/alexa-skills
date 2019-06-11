const _ = require('lodash');


const {
  get,
} = _;

module.exports = function getSlot(intent={}, slotName) {
  return get(intent, `slots.${slotName}`);
};

