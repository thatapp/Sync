const axioshelper = require("./lib/axios");
const {messages} = require("elasticio-node");


module.exports = async function verify(credentials, cb) {
    try {
        let url = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/findOne';
        let ClusterName = "MigrateCluster0";
        this.logger.info(JSON.stringify(credentials));
        let apiKey = credentials.apiKey;

        let payload = {
            dataSource: ClusterName,
            database: "avaSync_DB",
            collection: "sync",
            filter: {
                "item_id": "8293825"
            }
        };

        let data_ = await axioshelper.initialiseAxios(url, payload, apiKey);

        this.logger.info(JSON.stringify(data_));

        return cb(null, {verified: true});
    } catch (e) {
        return cb(null, {verified: false});
    }

};

