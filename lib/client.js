const axios = require('axios');
const commons = require('@elastic.io/component-commons-library');

class Client {
  constructor(context, cfg) {
    this.logger = context.logger;
    const {
      apiKey,
      apiVersion = 'beta',
      appId = 'data-maqtf',
      clusterName = 'MigrateCluster0',
    } = cfg;
    this.cfg = cfg;
    this.clusterName = clusterName;

    this.axiosClient = axios.create({
      baseURL: `https://data.mongodb-api.com/app/${appId}/endpoint/data/${apiVersion}/action`,
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  async apiRequest(action, additionalData, msg) {
    this.logger.debug(`Going to make "${action}" API action`);
    const { database, collection } = msg.body;
    const opts = {
      url: action,
      method: 'POST',
      data: {
        dataSource: this.clusterName,
        database,
        collection,
        ...additionalData,
      },
    };
    try {
      const { data } = await commons.axiosReqWithRetryOnServerError.call(this, opts, this.axiosClient);
      this.logger.debug(`"${action}" done successfully`);
      return data;
    } catch (err) {
      this.logger.error(`Got error "${err.response.statusText}", status "${err.response.status}, body: "${JSON.stringify(err.response.data)}"`);
      throw err;
    }
  }
}

exports.Client = Client;
