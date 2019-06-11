const { get } = require('lodash/object');

const addSpeechMarkup = require('./add-speech-markup');


const PROFILE_VERBIAGE = {
  // KEY: profile.query
  query(data={}) {
    const { person } = data;
    return `${person.displayName} is a ${person.title} on the ${person.team} Team.`;
  },

  // KEY: profile.field
  field(data={}) {
    const { person, field, value: fieldValue } = data;
    const value = addSpeechMarkup(field, fieldValue);
    return `${person.displayName}'s ${field} is ${value}.`;
  },

  fieldNotFound(data={}) {
    const { person, field } = data;
    return `${person.displayName} does not have a ${field}.`;
  },

  // KEY: profile.notFound
  notFound() {
    return 'Sorry, i was unable to find anyone matching your request.';
  },
};

// SearchIntent
const SEARCH_VERBIAGE = {
  // KEY: search.query
  query(data={}) {
    const limit = 3;
    const { count, value, people } = data;

    const relevantSegment = (count > limit)
      ? `here are the ${limit} most relevant people:`
      : 'here are the most relevant people:';

    const segments = [
      `${count} people were found for ${value},`,
      relevantSegment,
      people.slice(0, limit).map(p => p.displayName).join(', '),
    ];

    return segments.join(' ');
  },

  // KEY: search.field
  field(data={}) {
    const limit = 3;
    const { count, field, value: fieldValue, people } = data;

    const relevantSegment = (count > limit)
      ? `here are the ${limit} most relevant people:`
      : 'here are the most relevant people:';

    const value = addSpeechMarkup(field, fieldValue);

    const segments = [
      `${count} people were found with ${field} of ${value},`,
      relevantSegment,
      people.slice(0, limit).map(p => p.displayName).join(', '),
    ];

    return segments.join(' ');
  },

  fieldNotFound(data={}) {
    const { person, field } = data;
    return `${person.displayName} does not have a ${field}`;
  },

  // KEY: search.notFound
  notFound() {
    return 'Sorry, i was unable to find anyone matching your request.';
  },
};

const PHONE_VERBIAGE = {
  phone(data={}) {
    const { person } = data;
    const number = addSpeechMarkup('phone', person['phone']);
    return `${person.displayName}'s phone number is ${number}, connecting you now.`;
  },

  cell(data={}) {
    const { person } = data;
    const number = addSpeechMarkup('cell', person['cell']);
    return `${person.displayName}'s cell number is ${number}, connecting you now.`;
  },
};

const VERBIAGE = {
  profile: PROFILE_VERBIAGE,
  search: SEARCH_VERBIAGE,
  phone: PHONE_VERBIAGE,
};

function makeVerbiage(key, data={}) {
  const render = get(VERBIAGE, key);
  if (!render) {
    throw new Error('TODO(digia): Throw customer error for makeVerbiage.');
  }

  return render(data);
}

module.exports = {
  VERBIAGE,
  makeVerbiage,
};

