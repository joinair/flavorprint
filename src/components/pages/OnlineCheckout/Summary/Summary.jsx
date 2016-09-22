
import React, { PropTypes } from 'react';

import get from 'lodash/get';
import filter from 'lodash/filter';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import size from 'lodash/size';

import formatPrice from 'helpers/formatPrice';

import Button from 'components/ui-elements/Button';

const getFormattedPrice = items => {
  const totalPrice = reduce(
    items,
    (sum, { siDecision }) =>
      sum + get(siDecision, 'item.price', 0) * get(siDecision, 'qty.value', 1),
    0
  );

  const currencyKey = 'siDecision.item.currency';
  const currency = get(find(items, currencyKey), currencyKey);

  return formatPrice(totalPrice, currency);
};

const TableItem = ({ title, value }) => (
  <tr className="OnlineCheckout-summary-item">
    <td className="OnlineCheckout-summary-key">
      {title}
    </td>
    <td className="OnlineCheckout-summary-value">
      <b>{value}</b>
    </td>
  </tr>
);

const Summary = ({ items, store, onSend }) => {
  const itemsCount = size(filter(items, 'siDecision.qty.value'));
  const { symbol, priceString } = getFormattedPrice(items);
  const price = `${itemsCount ? symbol : ''}${priceString}`;

  return (
    <div className="OnlineCheckout-summary">
      <div className="OnlineCheckout-summary-inner">
        <table className="OnlineCheckout-summary-table">
          <tbody>
            <TableItem title="Store" value={store} />
            <TableItem title="Items" value={itemsCount} />
            <TableItem title="Price" value={price} />
          </tbody>
        </table>

        <Button
          className="OnlineCheckout-summary-action"
          onClick={onSend}
        >
          Send to {store}
        </Button>
      </div>
    </div>
  );
};

TableItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]).isRequired,
};

Summary.propTypes = {
  items: PropTypes.array.isRequired,
  store: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default Summary;
