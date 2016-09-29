/* eslint no-param-reassign:0 */

import crypto from 'crypto';
import onHeaders from 'on-headers';
import config from '../serverConfig';

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

export default (req, res, next) => {
  req.session = {};

  const header = req.headers['x-session-key'];

  if (header) {
    const decrypted = decrypt(header);
    if (decrypted) {
      const { data, _digest } = decrypted;
      if (data && _digest && digest(data) === _digest) {
        req.session = JSON.parse(data);
      }
    }
  }

  req.setSession = newData => onHeaders(res, function callback() {
    const strData = JSON.stringify(newData);

    this.setHeader('X-Session-Key', encrypt({
      data: strData,
      _digest: digest(strData),
    }));
  });
  return next();
};
