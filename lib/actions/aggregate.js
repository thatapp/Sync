let { messages } = require('elasticio-node');
let axioshelper = require("../axios");

exports.process = async function process(msg, cfg) {
    let that = this;
    try {
       
        const url = 'https://data.mongodb-api.com/app/endpoint/data/beta/action/aggregate';
        let apiKey = cfg.mongo_credential.apiKey;
        const payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            pipeline: msg.body.pipeline
        };

        let data_ = await axioshelper.initialiseAxios(url,payload,apiKey);
        await that.emit('data', messages.newMessageWithBody(data_ ));
    } catch (error) {
        await that.emit('error', messages.newMessageWithBody(error ));
    }
}
