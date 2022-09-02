const { messages } = require('elasticio-node');
const axioshelper = require('../axios');

exports.process = async function process(msg, cfg) {
    const that = this;
    try {
        let data = msg;

        let url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/updateMany';
        let apiKey = cfg.mongo_credential.apiKey;
        let ClusterName = "MigrateCluster0";

        let dataLoad = { "$set": data.body.save_data }
        let payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: data.body.condition,
            update: dataLoad,
            upsert: true
        };

        let data_ = axioshelper.initialiseAxios(url,payload,apiKey);

        await that.emit('data', messages.newMessageWithBody( data_ ));
            
    } catch (error) {
        await that.emit('data', messages.newMessageWithBody( error ));
    }
}
