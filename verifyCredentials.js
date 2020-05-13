const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

module.exports =  async function verify(credentials, cb) {
    console.log(JSON.stringify(credentials));

    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true, };

    const uri = `mongodb://${credentials.username}:${credentials.password}.@mongo-0.kubernetes.thatapp.io,mongo-1.kubernetes.thatapp.io,mongo-2.kubernetes.thatapp.io:30127/?authSource=admin&replicaSet=mongodb-replicaset-operator&readPreference=secondaryPreferred&appname=MongoDB%20Compass&ssl=true`;
    console.log(uri);

    await MongoClient.connect(uri, options,function(err, client) {
        console.log(err);
        console.log("Connected successfully to server");
    });

    return cb(null, { verified: true });
};

