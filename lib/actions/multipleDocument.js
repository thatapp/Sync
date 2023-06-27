/* eslint-disable no-restricted-syntax, no-await-in-loop */
const { messages } = require('elasticio-node');
const { Client } = require('../client');

let client;

exports.process = async function process(msg, cfg) {
  this.logger.info('"Find multiple Document" action started...');
  if (!client) client = new Client(this, cfg);
  const { condition: filter } = msg.body;

  let skip = (msg.body.skip) ? msg.body.skip: 0;

  const limit = (msg.body.limit) ? msg.body.limit : null;

  const emitAll = (msg.body.emitAll) ? msg.body.emitAll : "no";

  let pageCount = 1000;

  let result = {
    documents: [],
  };

  let buffer = {};

  do {

    buffer = await client.apiRequest('find', { filter, skip,limit }, msg);

    // Update result 
    result.documents = result.documents.concat(buffer.documents);

    // Update skip
    pageCount = result.documents.length;
    skip += pageCount;

  } while (emitAll === "yes" && !(pageCount <= 1000));

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
