const BASE_URL = 'https://demo.justsift.com';
const BASE_SEARCH_URL = `${BASE_URL}/api/search/people`;

const TWILIO_ACCOUNT_SID = 'Your Twilio Account SID';
const TWILIO_TOKEN = 'Your Twilio Token';
const TWILIO_NUMBER = 'Your Twilio Number';

// NOTE(digia): Number Twilio will use to connect the phone intent call to; e.g.
// Twilio will connect this number and the Sift person you're trying to call
const PHONE_INTENT_CALLEE = 'Callee Phone Number';


module.exports = {
  BASE_URL,
  BASE_SEARCH_URL,
  TWILIO_ACCOUNT_SID,
  TWILIO_TOKEN,
  TWILIO_NUMBER,
  PHONE_INTENT_CALLEE,
};

