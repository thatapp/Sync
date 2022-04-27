const axios = require("axios");
const { messages } = require('elasticio-node');

exports.process = async function process(msg, cfg) {

        var data = msg;
        const that = this;
        const url = 'https://data.mongodb-api.com/app/endpoint/data/beta/action/insertMany';
        // const url = 'https://data.mongodb-api.com/app/6266a4b56e72da17e728f3a3/endpoint/data/beta/action/insertMany';
        const API_KEY = "5IW6Dmt229rVniPZyineuqxYFhhuNJqHegd7PWckFTcirq2973MyclVbsR4xpFNA";
        const ClusterName = "MigrateCluster0"
        const config = {
            headers: {
                "api-key": API_KEY
            }
        };
        
            
        const payload = {
            dataSource: ClusterName,
            database: msg.body.database,
            collection: msg.body.collection,
            documents: {
                data: JSON.stringify(data.body.save_data)
            }
        };

        axios.post(url, payload, config)
        .then((response) => {
            that.emit('data', messages.newMessageWithBody(response));
          })
          .catch((error) => {
            const err = JSON.stringify(error);
            that.emit('data', messages.newMessageWithBody(err));
          });

}
