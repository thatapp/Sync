const { messages } = require("elasticio-node");
const { Client } = require("../client");

let client;

exports.process = async function process(msg, cfg) {
  try {
    this.logger.info('"Upsert" action started...');
    if (!client) client = new Client(this, cfg);
    this.logger.info("Running line 9");
    const { condition: filter, save_data } = msg.body;
    this.logger.info("Running line 11");
    const update = { $set: save_data };
    this.logger.info("Running line 13");
    const result = await client.apiRequest(
      "updateMany",
      { filter, update, upsert: true },
      msg
    );
    this.logger.info('"Upsert" action done successfully');
    await this.emit("data", messages.newMessageWithBody(result));
  } catch (error) {
    this.logger.info("Error occurred");
    this.logger.info(error);
    this.logger.info(error.stack);
  }
};
