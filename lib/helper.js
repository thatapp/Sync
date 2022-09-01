const axios = require("axios");
const assert = require('assert');
const { messages } = require('elasticio-node');
const { JsonataTransform } = require('@elastic.io/component-commons-library');

exports.process = async function process(msg, cfg) {
    try {
        var data = msg;
        let that = this;
        const url = 'https://data.mongodb-api.com/app/6266a4b56e72da17e728f3a3/endpoint/data/beta/action/insertOne';
        const API_KEY = cfg.API_KEY;
        const ClusterName = "MigrateCluster0"
        const config = {
            headers: {
                "api-key": API_KEY
            }
        }
    } catch (error) {
        that.emit('error', error);
    }
}
