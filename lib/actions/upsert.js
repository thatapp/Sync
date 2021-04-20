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
        connectTimeoutMS: 30000,
        socketTimeoutMS:  360000,
        keepAlive: true,
    };
  const uri = "mongodb+srv://" + username + ":" + password +"@migratecluster0.si2d6.mongodb.net/admin?connectTimeoutMS=300000&keepAlive=300000";
  console.log("URL:"+uri);
  var database = getData(data.body.database,data);
  console.log("Database:"+database);

  var collection_ = getData(data.body.collection,data);
  console.log("Collection: "+collection_);

try {
    console.log("Enter here");
    new MongoClient.connect(uri, options, async function (err, client) {
        // assert.equal(null, err);
        if(err) {
            await that.emit('data', messages.newMessageWithBody(err));
            return;
        }
        console.log("Connected successfully to server");
        console.log(collection_);
        console.log(database);
        const collection = client.db(database).collection(collection_);

        updateDocument(collection, data, that, function () {
            client.close();
        });
    });
}catch (err) {
    console.log("Error "+ err.message);
    that.emit('error', err);
  }

};

process.on('uncaughtException', function (err) {
    console.error('uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
  });
const updateDocument =  async function (collection, data,that, callback) {
    var data_save = getData(JSON.stringify(data.body.save_data),data,1);

    var condition = getData(JSON.stringify(data.body.condition),data,1);

    data_save = Object.assign({}, data_save);


    collection.updateOne(condition, {$set: data_save}, {upsert: false, multi:false}, async function (err, result) {
        console.log("Upserted Documents");
        // console.log(result);
        await that.emit('data', messages.newMessageWithBody(data.body.save_data));
        callback(result);
    });
};

function getData(value,data, json = 0){

    var g_data = JsonataTransform.jsonataTransform(data, { expression: value});

    if(g_data !== undefined){
        return g_data;
    }

    return value;
}
