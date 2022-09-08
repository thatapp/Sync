let { messages } = require('elasticio-node');
let axioshelper = require('../axios');

exports.process = async function process(msg, cfg) {
    let that = this;
    try {
        let url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/updateMany';
        let apiKey = cfg.mongo_credential.apiKey;
        let ClusterName = "MigrateCluster0";

        let dataLoad = { "$set": msg.body.save_data }
        let payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: msg.body.condition,
            update: dataLoad,
            upsert: true
        };

        let data_ = await axioshelper.initialiseAxios(url, payload, apiKey);

        await that.emit('data', messages.newMessageWithBody(data_));

    } catch (error) {
        await that.emit('error', messages.newMessageWithBody(error));
    }
}
