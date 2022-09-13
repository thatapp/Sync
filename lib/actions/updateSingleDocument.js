/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const { messages } = require('elasticio-node');
const axioshelper = require('../services/axios');
const variable = require('../services/variable');

async function processAction(msg, cfg) {
  const that = this;
  try {
    const { apiKey } = cfg;
    const dataLoad = { $set: variable.getData(msg.body.save_data, msg) };
    const payload = {
      database: variable.getData(msg.body.database, msg),
      collection: variable.getData(msg.body.collection, msg),
      filter: variable.getData(msg.body.condition, msg),
      update: dataLoad,
      upsert: true,
    };

    const data_ = await axioshelper.initialiseAxios('updateOne', payload, apiKey);
    await that.emit('data', messages.newMessageWithBody(data_));
  } catch (error) {
    await that.emit('error', messages.newMessageWithBody(error));
  }
}

module.exports.process = processAction;
