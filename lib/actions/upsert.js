const { messages } = require('elasticio-node');
const { Client } = require("../client");

let client;

exports.process = async function process(msg, cfg) {
    this.logger.info('"Upsert" action started...');
    if (!client) client = new Client(this, cfg);
    const { condition: filter, save_data } = msg.body;
    const update = { "$set": save_data };

    const result = await client.apiRequest('updateMany', { filter, update, upsert: true }, msg);
    this.logger.info('"Upsert" action done successfully');

    if ((cfg.emit_behavior && cfg.emit_behavior == "individual")&& Array.isArray(result)) {
        for (const i_item of result) {
            const output = messages.newMessageWithBody(i_item);
            await this.emit('data', output);
        }
    }else {
        await this.emit('data', messages.newMessageWithBody(result));
    }
}
