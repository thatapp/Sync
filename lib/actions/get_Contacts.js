/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/**
 * Auto-generated action file for "Accounting" API.
 *
 * Generated at: 2019-05-07T14:45:03.606Z
 * Mass generator version: 1.1.0
 *
 * flowground :- Telekom iPaaS / xero-com-connector
 * Copyright © 2019, Deutsche Telekom AG
 * contact: flowground@telekom.de
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: undefined
 * Endpoint Path: '/Contacts'
 * Method: 'get'
 *
 */

const { messages } = require('elasticio-node');
const axios = require('axios');

exports.process = function process(msg, cfg) {
  const that = this;
  const token = cfg.oauth.access_token;
  // Make a request for a user with a given ID
  const url = 'https://api.xero.com/api.xro/2.0/Contacts';

  const config = {
    params: msg.body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.get(url, config)
    .then((response) => {
      that.emit('data', messages.newMessageWithBody(response));
    })
    .catch((error) => {
      const err = JSON.stringify(error);
      that.emit('data', messages.newMessageWithBody(err));
    });
};