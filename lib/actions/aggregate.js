const axios = require("axios");
const { messages } = require('elasticio-node');
const https = require("https");
const http = require("http");

exports.process = async function process(msg, cfg) {
    try {
        var data = msg;
        let that = this;
        const url = 'https://data.mongodb-api.com/app/endpoint/data/beta/action/aggregate';
        const API_KEY = "7ZjEgmpfzAlwIhdY1OitF7QBIdTxgmrTjlCsZwbvxEHzxPmsCLMHdwfgADcyxrTR";
        const ClusterName = "MigrateCluster0"
        const httpAgent = new http.Agent({ keepAlive: true })
        const httpsAgent = new https.Agent({ keepAlive: true })

        const config = {
            headers: {
                "api-key": API_KEY,
                "Content-Type": "application/json"
            },
            httpAgent,
            httpsAgent
        };


        const payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            pipeline: msg.body.pipeline
        };

        const response = await axios.post(url, payload, config);
        const data_ = response.data;
        await that.emit('data', messages.newMessageWithBody({ data_ }));
    } catch (error) {
        await that.emit('data', messages.newMessageWithBody({ error }));
    }
}
