/* eslint no-param-reassign:0 */

import crypto from 'crypto';
import onHeaders from 'on-headers';
import each from 'lodash/each';
import config from '../serverConfig';

import { X_SESSION_KEY } from 'constants/Headers';

const password = config.SESSION_SECRET;

const encrypt = obj => {
  if (obj) {
    return new Buffer(JSON.stringify(obj)).toString('base64');
  }
};

const decrypt = text => {
  try {
    return JSON.parse(new Buffer(text, 'base64').toString('utf8'));
  } catch (e) {
    return;
  }
};

const digest = text => {
  const hmac = crypto.createHmac('sha256', password);
  hmac.setEncoding('base64');
  hmac.write(text);
  hmac.end();
  return hmac.read();
};

const encryptFromData = newData => {
  const strData = JSON.stringify(newData);

  return encrypt({
    data: strData,
    _digest: digest(strData),
  });
};

export const decryptFromHeaders = header => {
  if (header) {
    const decrypted = decrypt(header);
    if (decrypted) {
      const { data, _digest } = decrypted;
      if (data && _digest && digest(data) === _digest) {
        return JSON.parse(data);
      }
    }
  }

  return {};
};

export const getSessionHeaders = data => ({
  [X_SESSION_KEY]: encryptFromData(data),
});

export default (req, res, next) => {
  const header = req.headers[X_SESSION_KEY];
  req.session = decryptFromHeaders(header);

  req.setSession = newData => onHeaders(res, function callback() {
    each(getSessionHeaders(newData), (value, headerName) => {
      this.setHeader(headerName, value);
    });
  });
  return next();
};
