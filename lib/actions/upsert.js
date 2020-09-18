var MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    fs = require('fs');
const jsonata = require("jsonata");
const assert = require('assert');
// const {messages} = require('elasticio-node');

var ca = [fs.readFileSync(__dirname + "/../ssl/ca.pem")];

exports.process = async function process(msg, cfg) {
    var data = msg.body;
    // create a client object that has methods to make a request available to us
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
   // var database = getData(data.database,data);

    var database = JsonataTransform.jsonataTransform(data, { expression: data.database }, this);
    console.log(database);

    if(typeof database == "undefined"){
        database = data.database;
    }
   // var collection_ = getData(data.collection,data);
    var collection_ = JsonataTransform.jsonataTransform(data, { expression: data.collection }, this);
    console.log(collection_);

    if(typeof collection_ == "undefined"){
        collection_ = data.collection;
    }

    MongoClient.connect(uri, options, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        console.log(collection_);
        console.log(database);
        const collection = client.db(database).collection(collection_);

        // updateDocument(collection, data, function () {
        //     client.close();
        // });
    });

    await this.emit('data', messages.newMessageWithBody(data));
};

const updateDocument = function (collection, data, callback) {
    // Update document where a is 2, set b equal to 1

    var data_save = getData(data.data,data,1);
    var condition = getData(data.condition,data,1);

    data_save = Object.assign({}, data_save);

    collection.updateOne(condition, {$set: data_save}, {upsert: true}, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
};

function getData(value,data, json = 0){
    if(json == "0") {
        var expression = jsonata(JSON.stringify(value));
        return expression.evaluate(data);
    }else{
        try{
            var expression = jsonata(JSON.stringify(value));
            return expression.evaluate(data);
        }catch (e) {
            return {
                'data': "Invalid Json"
            }
        }
    }
}
