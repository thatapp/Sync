var MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    fs = require('fs');
const jsonata = require("jsonata");
const assert = require('assert');
const {messages} = require('elasticio-node');

var ca = [fs.readFileSync(__dirname + "/../ssl/ca.pem")];

exports.process = async function process(msg, cfg) {
    var data = msg.body;
    var that = this;
    // create a client object that has methods to make a request available to us
    var username = cfg.username;
    var password = cfg.password;
    var dbAdmin = cfg.db_admin;

    password = password.replace("@", "%40");


    var options = {
        useNewUrlParser: true
    };

  //  const uri = "mongodb://" + username + ":" + password + "@mongo-0.kubernetes.thatapp.io,mongo-1.kubernetes.thatapp.io,mongo-2.kubernetes.thatapp.io:27017/?authSource=" + dbAdmin + "&replicaSet=mongodb-replicaset-operator&readPreference=secondaryPreferred&ssl=true";
    const uri = "mongodb+srv://" + username + ":" + password +"@migratecluster0.si2d6.mongodb.net/admin?connectTimeoutMS=300000&keepAlive=300000";
    var database = getData(data.database, data);


    if (typeof database == "undefined") {
        database = data.database;
    }
    var collection_ = getData(data.collection, data);

    var pipelines = getData(data.pipeline, data);

    if (typeof collection_ == "undefined") {
        collection_ = data.collection;
    }

    if (typeof pipelines == "undefined") {
        pipelines = data.pipeline;
    }

    MongoClient.connect(uri, options, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const collection = client.db(database).collection(collection_);
        collection.aggregate(pipelines).toArray(function (err, results) {
            assert.equal(null, err);
            console.log(results);
            emitData_(cfg, results, that);
            client.close();
        });
    });
};

async function emitData_(cfg, result, that) {
    const {messages} = require('elasticio-node');
    if (cfg.behaviour == "individually" && Array.isArray(result)) {
        for (const i_item of result) {
            const output = messages.newMessageWithBody(i_item);
            await that.emit('data', output);
        }
        await that.emit('end');
    } else {
        that.emit('data', messages.newMessageWithBody(result));
    }
};


function getData(value, data, json = 0) {
    if (json == "0") {
        var expression = jsonata(JSON.stringify(value));
        return expression.evaluate(data);
    } else {
        try {
            var expression = jsonata(JSON.stringify(value));
            return expression.evaluate(data);
        } catch (e) {
            return {
                'data': "Invalid Json"
            }
        }
    }
}
