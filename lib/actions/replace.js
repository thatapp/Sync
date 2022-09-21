const { messages } = require('elasticio-node');
const { Client } = require('../client');

let client;

exports.process = async function process(msg, cfg) {
  this.logger.info('"Replace a Document" action started...');
  if (!client) client = new Client(this, cfg);
  const { condition: filter, save_data } = msg.body;
  const replacement = { $set: save_data };

  const result = await client.apiRequest('replaceOne', { filter, replacement, upsert: true }, msg);
  this.logger.info('"Replace a Document" action done successfully');
  await this.emit('data', messages.newMessageWithBody(result));
};
