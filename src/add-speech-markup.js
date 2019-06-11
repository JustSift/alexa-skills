const Speech = require('ssml-builder');
const _ = require('lodash');


const {
  camelCase,
} = _;

const FIELD_SSML = {
  extension: [
    (speech, value) => speech.sayAs({ word: value, interpret: 'digits' }),
  ],

  phone: [
    (speech, value) => speech.sayAs({ word: value, interpret: 'telephone' }),
  ],

  cell: [
    (speech, value) => speech.sayAs({ word: value, interpret: 'telephone' }),
  ],
};

module.exports = function addSpeechMarkup(fieldName, fieldValue) {
  const wrappers = FIELD_SSML[camelCase(fieldName)];
  if (!wrappers) {
    return fieldValue;
  }

  const excludeSpeakTag = true;
  const speech = new Speech();
  return wrappers.reduce((accum, fn) => fn(speech, accum), fieldValue)
    .ssml(excludeSpeakTag);
};

