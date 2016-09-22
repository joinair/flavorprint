/* eslint quote-props: 0 */

import findKey from 'lodash/findKey';
import includes from 'lodash/includes';

// List of unicode characters for currencies
// http://www.fileformat.info/info/unicode/category/Sc/list.htm

const symbols = {
  '\u0024': ['AU/C', 'US/C', 'USD/C'],
  '\u00A3': ['GBX'],
};

const getSymbol = currency =>
  findKey(symbols, currencies => includes(currencies, currency)) || '';

export default (price, currency) => {
  const priceString =
    (price / 100.0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

  return { price, priceString, symbol: getSymbol(currency) };
};
