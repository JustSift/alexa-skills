const _ = require('lodash');
const _fetch = require('node-fetch');

const Package = require('../package.json');


const {
  isObject,
  isNull,
  merge,
} = _;

let AUTH_TOKEN = null;
if (isNull(AUTH_TOKEN)) {
  try {
    const json = require('../auth-token.json');
    AUTH_TOKEN = json.token;
  } catch (err) {
    // Auth doesn't exist, nothing else to do.
    console.log('"auth-token.json" file not found, requests will be unauthenticated.');
  }
}

module.exports = function fetch(url, options={}) {
  const userAgent = `Sift Alexa/${Package.version}`;
  const defaultHeaders = isNull(AUTH_TOKEN)
    ? { userAgent, Authorization: `Bearer ${AUTH_TOKEN}` }
    : { userAgent };
  const optionHeaders = (options.headers && isObject(options.headers)) ? options.headers : {};
  const headers = merge(defaultHeaders, optionHeaders);
  return _fetch(url, merge(options, { headers }));
};

