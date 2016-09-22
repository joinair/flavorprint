
import find from 'lodash/find';
import get from 'lodash/get';
import reduce from 'lodash/reduce';

import formatPrice from 'helpers/formatPrice';

export default items => {
  const price = reduce(
    items,
    (sum, { siDecision }) =>
      sum + get(siDecision, 'item.price', 0) * get(siDecision, 'qty.value', 1),
    0
  );

  const key = 'siDecision.item.currency';
  const currency = get(find(items, key), key);

  return formatPrice(price, currency);
};
