const { Client } = require('./lib/client');

module.exports = async function verify(cfg) {
  try {
    const client = new Client(this, cfg);
    const filter = { item_id: '8293825' };

    await client.apiRequest('findOne', { filter }, { body: { database: 'avaSync_DB', collection: 'sync' } });

    this.logger.info('Verification completed successfully');
    return { verified: true };
  } catch (e) {
    this.logger.error('Verification failed');
    throw e;
  }
};
