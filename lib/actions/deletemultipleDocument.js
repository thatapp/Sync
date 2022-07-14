const axios = require("axios");
const { messages } = require('elasticio-node');
const https = require("https");
const http = require("http");

exports.process = async function process(msg, cfg) {
    try {
        var data = msg;
        const that = this;

        const url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/deleteMany';

        const ClusterName = "MigrateCluster0";
        const httpAgent = new http.Agent({ keepAlive: true })
        const httpsAgent = new https.Agent({ keepAlive: true })

        const config = {
            headers: {
                "api-key": "7ZjEgmpfzAlwIhdY1OitF7QBIdTxgmrTjlCsZwbvxEHzxPmsCLMHdwfgADcyxrTR",
                "Content-Type": "application/json"
            },
            httpAgent,
            httpsAgent
        };
        console.log(config);

        const payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: data.body.condition
        };

        const response = await axios.post(url, payload, config)
        const data_ = response.data;
        await that.emit('data', messages.newMessageWithBody({ data_ }));
    } catch (error) {
        await that.emit('data', messages.newMessageWithBody({ error }));
    }
}
