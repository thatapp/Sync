const MongoClient = require('mongodb');
const assert = require('assert');
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
  var username = data.username;
  var password = data.password;

  const uri = "mongodb+srv://"+username+":"+password+"@sync-thatapp-mrjt2.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db(data.database).collection(data.collection);
    collection.updateOne(data.condition, data, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });

  });
  await this.emit('data', messages.newMessageWithBody(data));
};
