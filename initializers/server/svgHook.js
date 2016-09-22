/* eslint no-param-reassign:0 */

import path from 'path';

require.extensions['.svg'] = (module, filename) => {
  module.exports = `#${path.relative(process.cwd(), filename)}`;
};
