const axios = require("axios");
const { messages } = require('elasticio-node');

exports.process = async function process(msg, cfg) {

        var data = msg;
        const that = this;

        const url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/replaceOne';

        const ClusterName = "MigrateCluster0"

        const config = {
            headers: {
                "api-key": "7ZjEgmpfzAlwIhdY1OitF7QBIdTxgmrTjlCsZwbvxEHzxPmsCLMHdwfgADcyxrTR",
                "Content-Type": "application/json"
            }
        };
        console.log(config);

        const dataLoad = { "$set": data.body.save_data }
        const payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: data.body.condition,
            replacement:  JSON.stringify(dataLoad),
            upsert: true
        };

        axios.post(url, payload, config)
        .then((response) => {
            that.emit('data', messages.newMessageWithBody(response.data));
          })
          .catch((error) => {
            const err = JSON.stringify(error);
            console.log(err);
            that.emit('data', messages.newMessageWithBody(err));
          });

}
