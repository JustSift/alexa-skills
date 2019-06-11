const _ = require('lodash');


const {
  get,
} = _;

// NOTE(digia): getSlotValue should be split into 2 functions; getSlot, getSlotValue
function getSlotValue(request, slotName) {
  const slot = get(request, `intent.slots.${slotName}`);
  if (!slot) {
    return undefined;
  }

  // Check for synonyms
  // NOTE(digia): There is a lot more to resolutions, this is an extremely basic usecase
  const synonym = get(slot, 'resolutions.resolutionsPerAuthority.0.values.0.value.name');

  return synonym ? synonym : slot.value;
}

module.exports = {
  getSlotValue,
};

