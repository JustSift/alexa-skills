const CustomError = require('custom-error-generator');


const SiftAPIError = CustomError('SiftAPIError');
const SiftAPINoResultsFound = CustomError('SiftAPINoResultsFound', SiftAPIError);

const SiftPeopleError = CustomError('SiftPeopleError');
const SiftPersonInvalidProperty = CustomError('SiftPeopleInvalidPeople', SiftPeopleError);

const HandlerResponseError = CustomError('HandleResponseError');
const HandlerResponseNotFound = CustomError('HandleResponseNotFound', HandlerResponseError);


module.exports = {
  HandlerResponseError,
  HandlerResponseNotFound,
  SiftAPIError,
  SiftAPINoResultsFound,
  SiftPeopleError,
  SiftPersonInvalidProperty,
};

