# Alexa Skills
Alexa Skills for interacting with Sift.

## Disclaimer
__*Use at your own risk! This codebase and Sift Alexa Skills are not supported by Sift.*__

This project is the outcome of a Hackathon event that Sift attended in early
2018. The code and overall state of the project reflects that of a hackathon.

An internal API is used to fetch from data Sift (the same as that used by our UIs). Though a mature endpoint is
being used it can/will change without notice! You may change the base url in `src/config.js` and add an authentication token
to `auth-token.json` in the format { token: YOUR_JWT_HERE }. Do not commit this token to version control.

There is a external Sift API in the works -- currently in Alpha. Please reach
out to api@justsift.com with any inquires regarding SiftAPI.

## Intents

* Profile Intent: request specific attribute of a person within Sift
* Search Intent: search for a person within Sift
* Phone Intent: call a person within Sift using Twilio to connect the calls.
