/* eslint no-param-reassign:0 */

import {
  loadOrCreateUser,
  formatUserResponse,
} from '../actions/users';

import { getSessionHeaders } from '../sessionMiddleware';

export default ({ session }) => {
  const { userId } = session;
  const data = { id: userId };

  return loadOrCreateUser(data)
    .map(userRes => {
      const { body } = userRes;

      return {
        headers: getSessionHeaders({ userId: body.id }),
        body: formatUserResponse(
          body.email ? 'become' : 'anonymous',
          body,
        ),
      };
    });
};
