const chai = require('chai');
const sinon = require('sinon');
const { process } = require('../../lib/actions/upsert');
const { getContext, StatusCodeError } = require('../common');
const { Client } = require('../../lib/client');

chai.use(require('chai-as-promised'));

const { expect } = chai;

const fakeResponse = { id: 1 };

describe('"Upsert" action test', () => {
  describe('succeed', () => {
    let execRequest;
    beforeEach(() => {
      execRequest = sinon.stub(Client.prototype, 'apiRequest').callsFake(async () => fakeResponse);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('process', async () => {
      const body = { condition: 'some data', save_data: 'other data' };
      const context = getContext();
      await process.call(context, { body }, {});
      expect(context.emit.callCount).to.be.eq(1);
      expect(context.emit.getCall(0).args[1].body).to.be.deep.eq(fakeResponse);
      expect(execRequest.getCall(0).args).to.be.deep.eq(['updateMany', { filter: body.condition, update: { $set: body.save_data }, upsert: true }, { body }]);
    });
  });
  describe('fail', () => {
    beforeEach(() => {
      sinon.stub(Client.prototype, 'apiRequest').callsFake(async () => { throw new StatusCodeError(500); });
    });
    afterEach(() => {
      sinon.restore();
    });

    it('process', async () => {
      const body = { condition: 'some data' };
      await expect(process.call(getContext(), { body }, {})).to.be.rejectedWith('StatusCodeError');
    });
  });
});
