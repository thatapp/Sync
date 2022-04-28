const axios = require("axios");
const { messages } = require('elasticio-node');

exports.process = async function process(msg, cfg) {

        var data = msg;
        const that = this;

        const url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/updateMany';

        const API_KEY = cfg.API_KEY;
        const ClusterName = "MigrateCluster0"

        const config = {
            headers: {
                "api-key": API_KEY,
                "Content-Type": "application/json"
            }
        };

        const payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            filter: data.body.condition,
            update:  { "$set": JSON.parse(data.body.save_data) }
        };

        console.log(payload)
        axios.post(url, payload, config)
        .then((response) => {
            that.emit('data', messages.newMessageWithBody(response));
          })
          .catch((error) => {
            const err = JSON.stringify(error);
            console.log(err);
            that.emit('data', messages.newMessageWithBody(err));
          });

}
