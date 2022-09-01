const axios = require("axios");
// const https = require("https");
// const http = require("http");


const baseURL = 'https://data.mongodb-api.com/app/data-maqtf/endpoint/data/beta/action';

const Axios = axios.create({
    baseURL,
});

module.exports = Axios;