const Alexa = require('alexa-sdk');

const handlers = require('./src/handler');


const {
  profileIntent: profileIntentHandler,
  searchIntent: searchIntentHandler,
  phoneIntent: phoneIntentHandler,
} = handlers;

function ProfileIntent() {
  profileIntentHandler(this);
}

function SearchIntent() {
  searchIntentHandler(this);
}

function PhoneIntent() {
  phoneIntentHandler(this);
}

function AWSLambdaHandler(event, context, callback) {
  const alexa = Alexa.handler(event, context);

  alexa.registerHandlers({
    ProfileIntent,
    SearchIntent,
    PhoneIntent,
  });

  alexa.execute();
}

exports.handler = AWSLambdaHandler;

// Script block
if (require.main === module) {
  console.log('Script called directly running script block...');

  /*
    ?displayName=name
    ?q=name
  */

  // fetchSearchQuery('sift')
  //   .then(console.log);
}

