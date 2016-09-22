
import uuid from 'uuid';

let clientId;

export default () => {
  if (!clientId) {
    clientId = uuid.v4();
  }

  return clientId;
};
