const { messages } = require('elasticio-node');
const { Client } = require('../client');

let client;

exports.process = async function process(msg, cfg) {
  this.logger.info('"Find a Single Document" action started...');
  if (!client) client = new Client(this, cfg);
  const { condition: filter } = msg.body;

  const result = await client.apiRequest('findOne', { filter }, msg);
  this.logger.info('"Find a Single Document" action done successfully');
  await this.emit('data', messages.newMessageWithBody(result));
};
