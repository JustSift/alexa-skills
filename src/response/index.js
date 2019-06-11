const _ = require('lodash');

const verbiage = require('../verbiage');

const getSlotValue = require('../get-slot-value');
const getFieldValue = require('../get-field-value');


const {
  isNull,
  isUndefined,
} = _;

const { makeVerbiage } = verbiage;

function profileResponse(data={}) {
  return makeVerbiage('profile.query', data);
}

// PUT DEE DATA INTO DEE SLOTS
function profileFieldResponse(data={}, slots={}) {
  const { person } = data;
  const field = getSlotValue(slots.field);
  const value = getFieldValue(field, person);
  return makeVerbiage('profile.field', { field, value, person });
}

function searchResponse(data={}, slots={}) {
  const { query: querySlot } = slots;
  const value = getSlotValue(querySlot);

  const { count, people } = data;
  const verbiageInput = { value, people, count };

  return count
    ? makeVerbiage('search.query', verbiageInput)
    : makeVerbiage('search.notFound');
}

function searchFieldResponse(data={}, slots={}) {
  const field = getSlotValue(slots.field);
  const value = getSlotValue(slots.query);

  const { count, people } = data;
  const verbiageInput = { field, value, people, count };

  return count
    ? makeVerbiage('search.field', verbiageInput)
    : makeVerbiage('search.notFound');
}

function phoneResponse(data={}) {
  const { person } = data;
  const { cell, phone } = person;
  if (!cell && !phone) {
    throw new Error('Person does not have a "cell" nor "phone".');
  }

  // TODO(digia): Check for valid phone number
  return (!isNull(cell) && !isUndefined(cell))
    ? makeVerbiage('phone.cell', { person })
    : makeVerbiage('phone.phone', { person });
}


module.exports = {
  profile: profileResponse,
  profileField: profileFieldResponse,
  search: searchResponse,
  searchField: searchFieldResponse,
  phone: phoneResponse,
};

