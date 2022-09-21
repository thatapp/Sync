const { messages } = require('elasticio-node');
const { Client } = require("../client");

let client;

exports.process = async function process(msg, cfg) {
    this.logger.info('"Find multiple Document" action started...');
    if (!client) client = new Client(this, cfg);
    const { condition: filter } = msg.body;

    let result = await client.apiRequest('find', { filter }, msg);
    this.logger.info('"Find multiple Document" action done successfully');

    if ((cfg.emit_behavior && cfg.emit_behavior == "individual")&& Array.isArray(result)) {
        result = result.documents;
        for (const i_item of result) {
            const output = messages.newMessageWithBody(i_item);
            await this.emit('data', output);
        }
    }else {
        await this.emit('data', messages.newMessageWithBody(result));
    }
}
