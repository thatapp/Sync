const { messages } = require('elasticio-node');
// const axioshelper = require("../axios");
const axios = require("axios");
require("dotenv").config();

exports.process = async function process(msg, cfg) {
    // this.logger.info('KEY',cfg.mongo_credential.apiKey);
    const that = this;
    try {
        // console.log("APIKEY",cfg.mongo_credential.apiKey);
        let data = msg;

        let url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/findOne';
        let ClusterName = "MigrateCluster0";
        let apiKey = "7ZjEgmpfzAlwIhdY1OitF7QBIdTxgmrTjlCsZwbvxEHzxPmsCLMHdwfgADcyxrTR";
        let config = {
            headers: {
                "api-key": apiKey,
                "Content-Type": "application/json"
            },
            httpAgent,
            httpsAgent
        };
        let payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: data.body.condition
        };

        // let apiKey = cfg.mongo_credential.apiKey;

        console.log('API_KEY: ', process.env.API_KEY);

        let response = await axios.post(url, payload, config);
        let data_ = response.data;
        await that.emit('data', messages.newMessageWithBody(data_));
    } catch (error) {
        await that.emit('data', messages.newMessageWithBody(error));

    }
}
