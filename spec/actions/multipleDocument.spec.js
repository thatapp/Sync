const chai = require('chai');
const sinon = require('sinon');
const { process } = require('../../lib/actions/multipleDocument');
const { getContext, StatusCodeError } = require('../common');
const { Client } = require('../../lib/client');

chai.use(require('chai-as-promised'));

const { expect } = chai;

const fakeResponse = { documents: [{ doc1: 1 }, { doc2: 2 }] };

describe('"Find multiple Document" action test', () => {
  describe('succeed', () => {
    let execRequest;
    beforeEach(() => {
      execRequest = sinon.stub(Client.prototype, 'apiRequest').callsFake(async () => fakeResponse);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('process, emit_behavior: batch', async () => {
      const body = { condition: 'some data' };
      const context = getContext();
      const cfg = { emit_behavior: 'batch' };
      await process.call(context, { body }, cfg);
      expect(context.emit.callCount).to.be.eq(1);
      expect(context.emit.getCall(0).args[1].body).to.be.deep.eq(fakeResponse);
      expect(execRequest.getCall(0).args).to.be.deep.eq(['find', { filter: body.condition }, { body }]);
    });

    it('process, emit_behavior:individual', async () => {
      const body = { condition: 'some data' };
      const context = getContext();
      const cfg = { emit_behavior: 'individual' };
      await process.call(context, { body }, cfg);
      expect(context.emit.callCount).to.be.eq(2);
      expect(context.emit.getCall(0).args[1].body).to.be.deep.eq(fakeResponse.documents[0]);
      expect(context.emit.getCall(1).args[1].body).to.be.deep.eq(fakeResponse.documents[1]);
      expect(execRequest.getCall(0).args).to.be.deep.eq(['find', { filter: body.condition }, { body }]);
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
