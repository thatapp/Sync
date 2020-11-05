var MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    fs = require('fs');
// const jsonata = require("jsonata");
const assert = require('assert');
const {messages} = require('elasticio-node');
const { JsonataTransform } = require('@elastic.io/component-commons-library');
exports.process = async function process(msg, cfg) {
    var data = msg.body;
    let that = this;
    // create a client object that has methods to make a request available to us

    var username = cfg.username;
    var password = cfg.password;

     var dbAdmin = cfg.db_admin;

    password = password.replace("@", "%40");

    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        socketTimeoutMS:  360000,
        useMongoClient: true,
        keepAlive: true,
        reconnectTries: 30
    };

  const uri = "mongodb+srv://" + username + ":" + password +"@migratecluster0.si2d6.mongodb.net/admin?connectTimeoutMS=300000&keepAlive=300000";
 var database = getData(data.database,data);
   var collection_ = getData(data.collection,data);
try {
    MongoClient.connect(uri, options, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        console.log(collection_);
        console.log(database);
        const collection = client.db(database).collection(collection_);

        updateDocument(collection, data, that, function () {
            client.close();
        });
    });
}catch (err) {
    that.emit('error', err);
  }

};

const updateDocument =  async function (collection, data,that, callback) {
    // Update document where a is 2, set b equal to 1

    var data_save = getData(JSON.stringify(data.save_data),data,1);

    var condition = getData(JSON.stringify(data.condition),data,1);

    data_save = Object.assign({}, data_save);


    collection.updateOne(condition, {$set: data_save}, {upsert: true}, function (err, result) {
        console.log("Updated the document with the field a equal to 2");
        that.emit('data', messages.newMessageWithBody(data));
        callback(result);
    });
};

function getData(value,data, json = 0){

    var g_data = JsonataTransform.jsonataTransform(data, { expression: value}, this);

    if(g_data !== undefined){
        return g_data;
    }

    return value;
}
