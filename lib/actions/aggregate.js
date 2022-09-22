const { messages } = require('elasticio-node');
const { Client } = require('../client');

let client;

exports.process = async function process(msg, cfg) {
  this.logger.info('"Aggregation" action started...');
  if (!client) client = new Client(this, cfg);
  const { pipeline } = msg.body;

  const result = await client.apiRequest('aggregate', { pipeline }, msg);
  this.logger.info('"Aggregation" action done successfully');
  await this.emit('data', messages.newMessageWithBody(result));
};
