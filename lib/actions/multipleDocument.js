const Axios = require("axios");
const { messages } = require('elasticio-node');
const https = require("https");
const http = require("http");
const Token = require('../key');

exports.process = async function process(msg, cfg) {
    const that = this;
    try {
        var data = msg;
        
        const url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/find';
        const API_KEY = cfg.apiKey;
        console.log(cfg);
        const ClusterName = "MigrateCluster0"
        const httpAgent = new http.Agent({ keepAlive: true })
        const httpsAgent = new https.Agent({ keepAlive: true })

        const config = {
            headers: {
                "api-key": Token,
                "Content-Type": "application/json"
            },
            httpAgent,
            httpsAgent
        };
        console.log(config, API_KEY);

        // const dataLoad = { "$set": data.body.save_data }
        const payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: data.body.condition
        };

        const response = await Axios.post(url, payload, config);
        const data_ = response.data;
        await that.emit('data', messages.newMessageWithBody(data_ ));
    } catch (error) {
        await that.emit('data', messages.newMessageWithBody(error ));
    }
}
