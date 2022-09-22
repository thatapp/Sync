/* eslint-disable no-restricted-syntax, no-await-in-loop */
const { messages } = require('elasticio-node');
const { Client } = require('../client');

let client;

exports.process = async function process(msg, cfg) {
  this.logger.info('"Find multiple Document" action started...');
  if (!client) client = new Client(this, cfg);
  const { condition: filter } = msg.body;

  const result = await client.apiRequest('find', { filter }, msg);
  this.logger.info('"Find multiple Document" action done successfully');

  if (cfg?.emit_behavior === 'individual') {
    const { documents } = result;
    for (const document of documents) {
      const output = messages.newMessageWithBody(document);
      await this.emit('data', output);
    }
  } else {
    await this.emit('data', messages.newMessageWithBody(result));
  }
};
