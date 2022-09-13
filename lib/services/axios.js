/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const axios = require('axios');
const http = require('http');
const https = require('https');

// let httpAgent = new http.Agent({ keepAlive: true });
// let httpsAgent = new https.Agent({ keepAlive: true });

exports.initialiseAxios = async (url_parameter, payload, api_key) => {
  const url = `https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action/${url_parameter}`;
  const config = {
    headers: {
      'api-key': api_key,
      'Content-Type': 'application/json',
    },
  };
  payload.dataSource = 'MigrateCluster0';

  const response = await axios.post(url, payload, config);

  const data_ = response.data;

  return data_;
};
