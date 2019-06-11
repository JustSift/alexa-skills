const _ = require('lodash');

const errors = require('../errors');
const fetchSearchQuery = require('../fetch-search-query');
const getSlot = require('../get-slot');
const getSlotValue = require('../get-slot-value');
const responses = require('../response');
const twilioHelpers = require('../twilio');
const { PHONE_INTENT_CALLEE } = require('../config');


const {
  compact,
} = _;

const {
  SiftAPINoResultsFound,
} = errors;

const {
  profile: profileResponse,
  profileField: profileFieldResponse,
  search: searchResponse,
  searchField: searchFieldResponse,
  phone: phoneResponse,
} = responses;

function profileIntentHandler(alexa={}) {
  const { event } = alexa;

  // Name to search
  const fnameSlot = getSlot(event.request.intent, 'firstName');
  const fname = getSlotValue(fnameSlot);
  const lnameSlot = getSlot(event.request.intent, 'lastName');
  const lname = getSlotValue(lnameSlot);
  const query = compact([fname, lname]).join(' ');

  /*
    ?q=name
  */
  fetchSearchQuery(query)
    .then(({ totalLength, items }) => {
      const person = !totalLength ? null : items[0];

      // TODO(digia): Ensure that it's a name match

      if (!person) {
        throw new SiftAPINoResultsFound();
      }

      const fieldSlot = getSlot(event.request.intent, 'field');
      const fieldName = getSlotValue(fieldSlot);
      const response = fieldName ? profileFieldResponse : profileResponse;
      return response({ person }, { field: fieldSlot });

    })
    .then((ssml) => {
      alexa.response.speak(ssml);
      alexa.emit(':responseReady');
    })
    .catch((err) => {
      // Covers; SiftPersonInvalidProperty
      let message = err.message;
      if (err instanceof SiftAPINoResultsFound) {
        message = 'Sorry, i can\'t find any results for that.';
      }

      alexa.response.speak(message);
      alexa.emit(':responseReady');
    });
}

function searchIntentHandler(alexa={}) {
  const { event } = alexa;
  const querySlot = getSlot(event.request.intent, 'query');
  const fieldSlot = getSlot(event.request.intent, 'field');
  const fieldName = getSlotValue(fieldSlot);

  fetchSearchQuery(getSlotValue(querySlot), fieldName)
    .then((searchResult) => {
      const { items, totalLength } = searchResult;
      const data = { people: items, count: totalLength };
      const slots = { field: fieldSlot, query: querySlot };
      const response = fieldName ? searchFieldResponse : searchResponse;
      return response(data, slots);
    })
    .then((ssml) => {
      alexa.response.speak(ssml);
      alexa.emit(':responseReady');
    })
    .catch((err) => {
      // Covers; SiftPersonInvalidProperty
      let message = err.message;
      if (err instanceof SiftAPINoResultsFound) {
        message = 'Sorry, i can\'t find any results for that.';
      }

      alexa.response.speak(message);
      alexa.emit(':responseReady');
    });
}

function phoneIntentHandler(alexa={}) {
  const { event } = alexa;

  // Name to search
  const fnameSlot = getSlot(event.request.intent, 'firstName');
  const fname = getSlotValue(fnameSlot);
  const lnameSlot = getSlot(event.request.intent, 'lastName');
  const lname = getSlotValue(lnameSlot);
  const query = compact([fname, lname]).join(' ');

  /*
    ?q=name
  */
  fetchSearchQuery(query)
    .then(({ totalLength, items }) => {
      const person = !totalLength ? null : items[0];

      if (!person) {
        throw new SiftAPINoResultsFound();
      }

      // TODO(digia): Support requesting different phone types
      // const fieldSlot = getSlot(event.request.intent, 'field');
      // const fieldName = getSlotValue(fieldSlot);
      const ssml = phoneResponse({ person });
      alexa.response.speak(ssml);

      // Make Twillio call
      const { cell, phone } = person;
      const number = twilioHelpers.sanitizePhoneNumber(cell ? cell : phone);
      return twilioHelpers.makeVoiceCall(PHONE_INTENT_CALLEE, number);
    })
    .then(() => {
      alexa.emit(':responseReady');
    })
    .catch((err) => {
      // Covers; SiftPersonInvalidProperty
      let message = err.message;
      if (err instanceof SiftAPINoResultsFound) {
        message = 'Sorry, i can\'t find any results for that.';
      }

      alexa.response.speak(message);
      alexa.emit(':responseReady');
    });
}


module.exports = {
  profileIntent: profileIntentHandler,
  searchIntent: searchIntentHandler,
  phoneIntent: phoneIntentHandler,
};

