
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import get from 'lodash/get';
import find from 'lodash/find';
import reduce from 'lodash/reduce';

import formatPrice from 'helpers/formatPrice';

const Summary = ({ items, store }) => {
  const itemsNumber = items.length;
  const totalSum = reduce(
    items,
    (sum, { siDecision }) =>
      sum + get(siDecision, 'item.price', 0) * get(siDecision, 'qty.value', 1),
    0
  );

  const currencyKey = 'siDecision.item.currency';
  const currency = get(find(items, currencyKey), currencyKey);
  const formatedPrice = totalSum && currency && formatPrice(totalSum, currency);
  const priceInfo = formatPrice && (
    <div>
      <b>Price:</b>
      <i className={classnames(formatedPrice.icon, 'icon')} />
      {formatedPrice.priceString}
    </div>
  );

  return (
    <div>
      <div><b>Store:</b> {store}</div>
      <div>
        <b>Items:</b> {itemsNumber} {itemsNumber === 1 ? 'product' : 'products'}
      </div>
      {priceInfo}
    </div>
  );
};

Summary.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,

  store: PropTypes.string.isRequired,
};

export default Summary;
