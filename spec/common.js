/* eslint-disable import/first */
process.env.LOG_OUTPUT_MODE = 'short';
process.env.API_RETRY_DELAY = '0';
const getLogger = require('@elastic.io/component-logger');
const sinon = require('sinon');

const getContext = () => ({
  logger: getLogger(),
  emit: sinon.spy(),
});

class StatusCodeError extends Error {
  constructor(status) {
    super('');
    this.response = { status };
    this.message = 'StatusCodeError';
  }
}

exports.getContext = getContext;
exports.StatusCodeError = StatusCodeError;
