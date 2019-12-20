const request = require('request');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;;
const assert = require('assert');
const { messages } = require('elasticio-node');


const debug = require('debug')('verifyCredentials');

if (fs.existsSync('.env')) {
    // eslint-disable-next-line global-require
    require('dotenv').config();
}

// eslint-disable-next-line consistent-return
module.exports = function verify(credentials, cb) {
    if (!credentials.username || credentials.password) {
        return cb(null, { verified: false });
    }

    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true, };

    const uri = "mongodb+srv://"+credentials.username+":"+credentials.password+"@sync-thatapp-mrjt2.gcp.mongodb.net/test?retryWrites=true&w=majority";

    MongoClient.connect(uri, options,function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        return cb(null, { verified: true });
    });
};

