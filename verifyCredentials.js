const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

module.exports = async function verify(credentials, cb) {
    console.log(JSON.stringify(credentials));
    // if (!credentials.username || credentials.password) {
    //     return cb(null, { verified: false });
    // }
    debug('To verify credentials send request to %s', url);

    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true, };

    const uri = "mongodb+srv://"+credentials.username+":"+credentials.password+"@sync-thatapp-mrjt2.gcp.mongodb.net/test?retryWrites=true&w=majority";
console.log(uri);
    await MongoClient.connect(uri, options,function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

    });
    return cb(null, { verified: true });
};

