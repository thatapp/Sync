var MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    fs = require('fs');
// const jsonata = require("jsonata");
const assert = require('assert');
const {messages} = require('elasticio-node');
const { JsonataTransform } = require('@elastic.io/component-commons-library');
exports.process = async function process(msg, cfg) {
    var data = msg;
    let that = this;
    var username = cfg.username;
    var password = cfg.password;

     var dbAdmin = cfg.db_admin;

    password = password.replace("@", "%40");

    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 360000,
        socketTimeoutMS:  360000,
        keepAlive: true
    };
    
  const uri = "mongodb+srv://" + username + ":" + password +"@migratecluster0.si2d6.mongodb.net/admin?connectTimeoutMS=360000&socketTimeoutMS=360000&useUnifiedTopology=true&keepAlive=true";
 
  var database = getData(data.body.database,data);

  var collection_ = getData(data.body.collection,data);

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

    var data_save = getData(JSON.stringify(data.body.save_data),data,1);

    var condition = getData(JSON.stringify(data.body.condition),data,1);

    data_save = Object.assign({}, data_save);
    collection.updateMany(condition, {$set: data_save}, {upsert: true}, async function (err, result) {

         await that.emit('data', messages.newMessageWithBody(data.body.save_data));
        // callback(result);
    });
};

function getData(value,data, json = 0){

    var g_data = JsonataTransform.jsonataTransform(data, { expression: value});

    if(g_data !== undefined){
        return g_data;
    }

    return value;
}
