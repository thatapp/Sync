/* eslint-disable no-underscore-dangle */
const { messages } = require('elasticio-node');
const axioshelper = require('../services/axios');
const variable = require('../services/variable');

async function processAction(msg, cfg) {
  let that = this;
  let dataLoad = { $set: variable.getData(msg.body.save_data,msg) };
  this.logger.info(JSON.stringify(dataLoad));


  let payload = {
    database: variable.getData(msg.body.database,msg),
    collection: variable.getData(msg.body.collection,msg),
    filter: variable.getData(msg.body.condition,msg),
    update: dataLoad,
    upsert: (cfg.upsert == "true") ? true : false,
  };
  try {
    const { apiKey } = cfg;
    const data_ = await axioshelper.initialiseAxios('updateMany', payload, apiKey);
    await that.emit('data', messages.newMessageWithBody(data_));
  } catch (error) {
    this.logger.info(error.message);
    this.logger.info(JSON.stringify(payload));
    await that.emit('error', messages.newMessageWithBody(error));
  }
}

module.exports.process = processAction;
