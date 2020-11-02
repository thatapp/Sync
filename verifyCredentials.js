var MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    fs = require('fs');

const assert = require('assert');

var ca = [fs.readFileSync(__dirname + "/lib/ssl/ca.pem")];

module.exports =  async function verify(credentials, cb) {
    console.log(JSON.stringify(credentials));

    var options = {
        useNewUrlParser: true,
    };

    const uri = "mongodb+srv://" + username + ":" + password +"@migratecluster0.si2d6.mongodb.net/admin?connectTimeoutMS=300000&keepAlive=300000";
    console.log(uri);

    await MongoClient.connect(uri, options,function(err, client) {
        console.log(err);
        console.log("Connected successfully to server");
    });

    return cb(null, { verified: true });
};

