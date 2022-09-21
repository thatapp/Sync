const { messages } = require('elasticio-node');
const { Client } = require('../client');

let client;

exports.process = async function process(msg, cfg) {
  this.logger.info('"Insert multiple Document" action started...');
  if (!client) client = new Client(this, cfg);
  const { save_data: document } = msg.body;

  const result = await client.apiRequest('insertMany', { document }, msg);
  this.logger.info('"Insert multiple Document" action done successfully');
  await this.emit('data', messages.newMessageWithBody(result));
};
