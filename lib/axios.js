let axios = require("axios");
let http = require("http");
let https = require("https");

let httpAgent = new http.Agent({ keepAlive: true })
let httpsAgent = new https.Agent({ keepAlive: true })


exports.initialiseAxios = async (url, payload,api_key) => {

    let config = {
        headers: {
            "api-key": api_key,
            "Content-Type": "application/json"
        },
        httpAgent,
        httpsAgent
    };

    let response = await axios.post(url, payload, config)

    let data_ = response.data;

    return data_;
};