
import get from 'lodash/get';

import ERROR_MESSAGES from 'constants/ErrorMessages';

export default (namespace, path, { code, desc }) => {
  const customDescs = get(ERROR_MESSAGES, `${namespace}.${path}`, {});
  return customDescs[code] || desc;
};
