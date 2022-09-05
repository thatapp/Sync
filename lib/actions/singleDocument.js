const { messages } = require('elasticio-node');
const axioshelper = require("../axios");

exports.process = async function process(msg, cfg) {
    // this.logger.info('KEY',cfg.mongo_credential.apiKey);
    const that = this;
    try {
        // console.log("APIKEY",cfg.mongo_credential.apiKey);
        let data = msg;

        let url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/findOne';
        let ClusterName = "MigrateCluster0";
        let payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: data.body.condition
        };

        // let apiKey = cfg.mongo_credential.apiKey;
        let apiKey = "7ZjEgmpfzAlwIhdY1OitF7QBIdTxgmrTjlCsZwbvxEHzxPmsCLMHdwfgADcyxrTR";
        console.log('API_KEY: ',apiKey);

        let data_ = await axioshelper.initialiseAxios(url,payload,apiKey);
        await that.emit('data', messages.newMessageWithBody(data_ ));
    } catch (error) {
        await that.emit('data', messages.newMessageWithBody(error ));
        
    }
}
