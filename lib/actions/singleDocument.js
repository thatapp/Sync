const { messages } = require('elasticio-node');
const axioshelper = require("../axios");
// const axios = require("axios");
require("dotenv").config();

exports.process = async function process(msg, cfg) {
    this.logger.info('Application started...');
    
    const that = this;
    try {
        let data = msg;

        let url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/findOne';
        let ClusterName = "MigrateCluster0";
        
        let payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: data.body.condition
        };
        let apiKey = cfg.mongo_credential.apiKey;

        this.logger.info('KEY', apiKey);
        this.logger.info('API_KEY: ', process.env.API_KEY);

        let data_ = await axioshelper.initialiseAxios(url, payload, config);
        await that.emit('data', messages.newMessageWithBody(data_));
    } catch (error) {
        await that.emit('data', messages.newMessageWithBody(error));

    }
}
