
import uuid from 'uuid';

let clientId = undefined;

export default () => {
  if (!clientId) {
    clientId = uuid.v4();
  }

  return clientId;
};
