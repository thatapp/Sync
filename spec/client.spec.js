const chai = require('chai');
const sinon = require('sinon');
const externalApi = require('@elastic.io/component-commons-library/dist/src/externalApi');
const { getContext, StatusCodeError } = require('./common');
const { Client } = require('../lib/client');

chai.use(require('chai-as-promised'));

const { expect } = chai;

const fakeResponse = { data: { id: 1 } };

describe('"Client" test', () => {
  let execRequest;
  describe('succeed', () => {
    beforeEach(() => {
      execRequest = sinon.stub(externalApi, 'axiosReqWithRetryOnServerError').callsFake(async () => fakeResponse);
    });
    afterEach(() => { sinon.restore(); });

    it('apiRequest', async () => {
      const client = new Client(getContext(), { apiKey: 'apiKey' });
      const msg = { body: { database: 'a', collection: 'b' } };
      const result = await client.apiRequest('actionName', { pipeline: 'pipeline' }, msg);
      expect(result).to.be.deep.eq(fakeResponse.data);
      expect(execRequest.getCall(0).args[0]).to.be.deep.equal({
        method: 'POST',
        url: 'actionName',
        data: {
          collection: 'b',
          dataSource: 'MigrateCluster0',
          database: 'a',
          pipeline: 'pipeline',
        },
      });
    });
  });
  describe('fail', () => {
    beforeEach(() => {
      execRequest = sinon.stub(externalApi, 'axiosReqWithRetryOnServerError').callsFake(async () => { throw new StatusCodeError(500); });
    });
    afterEach(() => { sinon.restore(); });

    it('apiRequest', async () => {
      const client = new Client(getContext(), { apiKey: 'apiKey' });
      const msg = { body: { database: 'a', collection: 'b' } };
      await expect(client.apiRequest('actionName', { pipeline: 'pipeline' }, msg)).to.be.rejectedWith('StatusCodeError');
    });
  });
});
