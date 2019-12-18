const { expect } = require('chai');
const sinon = require('sinon');
const trigger = require('../lib/triggers/getPetsByStatus');

const cfg = {
  apiKey: 'secret',
  status: 'sold',
};

const self = {
  emit: sinon.spy(),
};

describe('Get Pets By Status', () => {
  it('Gets the correct status model', async () => {
    const statuses = await trigger.getStatusModel.call(this, cfg);
    expect(statuses).to.deep.equal({ available: 'Available', pending: 'Pending', sold: 'Sold' });
  });

  it('Retrieves the pets', async () => {
    await trigger.process.call(self, {}, cfg);
    expect(self.emit.calledOnce).to.be.true;
  });
});
