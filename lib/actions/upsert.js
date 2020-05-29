var MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    fs = require('fs');
const jsonata = require("jsonata");
const assert = require('assert');
const {messages} = require('elasticio-node');

var ca = [fs.readFileSync(__dirname + "/../ssl/ca.pem")];
/**
 * Executes the action's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function emits the results of the request to the platform as a message
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * Emits results as a message to the platform
 */
exports.process = async function process(msg, cfg) {
    var data = msg.body;
    // create a client object that has methods to make a request available to us
// Connection URL
    var username = cfg.username;
    var password = cfg.password;
    var dbAdmin = cfg.db_admin;
    password = password.replace("@", "%40");


    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        sslValidate:true,
        sslCA:ca
    };
    const uri ="mongodb://" + username + ":" + password + "@mongo-0.kubernetes.thatapp.io,mongo-1.kubernetes.thatapp.io,mongo-2.kubernetes.thatapp.io:27017/?authSource="+dbAdmin+"&replicaSet=mongodb-replicaset-operator&readPreference=secondaryPreferred&ssl=true";
    var database = getData(data.database,data);
    var collection_ = getData(data.collection,data);

    MongoClient.connect(uri, options, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        console.log(data.collection);
        const collection = client.db(database).collection(collection_);

        updateDocument(collection, data, function () {
            client.close();
        });
    });

    await this.emit('data', messages.newMessageWithBody(data));
};

const updateDocument = function (collection, data, callback) {
    // Update document where a is 2, set b equal to 1
    var data_save = getData(data.data,data);
    var condition = getData(data.condition,data);

    collection.updateOne(condition, {$set: data_save}, {upsert: true}, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
};

function getData(value,data){
    var expression = jsonata(value);
    return expression.evaluate(data);
}