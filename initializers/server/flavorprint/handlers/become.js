/* eslint no-param-reassign:0 */

import {
  loadOrCreateUser,
  formatUserResponse,
} from '../actions/users';

export default (req, res) => {
  const { userId } = req.session;
  const data = { id: userId };

  loadOrCreateUser(data).subscribe(userRes => {
    const { body } = userRes;
    req.session.userId = body.id;
    res.append('Content-Type', 'application/json');
    res.end(formatUserResponse(
      body.email ? 'become' : 'anonymous',
      body,
    ));
  }, () => {
    res.status(401).end('');
  });
};
