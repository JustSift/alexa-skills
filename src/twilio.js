const twilio = require('twilio');

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_TOKEN,
  TWILIO_NUMBER,
} = require('./config');


function makeVoiceCall(initializerNumber, searcheeNumber) {
  const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_TOKEN);

  // generate twiml for the outgoing twilio call to digest
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  const dial = response.dial();
  dial.number(searcheeNumber);

  const xml = response.toString();

  return client.calls.create({
    url: `http://twimlets.com/echo?Twiml=${encodeURIComponent(xml)}`,
    from: TWILIO_NUMBER,
    to: initializerNumber,
  });
}

function sanitizePhoneNumber(rawPhone) {
  if (!rawPhone) {
    return null;
  }

  // strip all non-digits
  let sanitizedString = rawPhone.replace(/\D/g, '');

  // add us country code if not aready there
  if (sanitizedString[0] !== '1') {
    sanitizedString = `1${sanitizedString}`;
  }

  // add plus for e.164
  return `+${sanitizedString}`;
}

// Script block
if (require.main === module) {
  makeVoiceCall('Initializer number', 'Receiving number');
}


module.exports = {
  sanitizePhoneNumber,
  makeVoiceCall,
};

