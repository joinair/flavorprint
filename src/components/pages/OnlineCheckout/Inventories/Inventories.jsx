
import React, { PropTypes } from 'react';

import map from 'lodash/map';
import partial from 'lodash/partial';

import getSummaryPrice from 'reducers/onlineCheckout/helpers/getSummaryPrice';

import './styles.css';

import OnlineCheckoutInventory from 'components/pages/OnlineCheckout/Inventory';

const OnlineCheckoutInventories = ({
  inventory, entries, items, isFetching,
  onInventorySelect,
}) => {
  const entryList = map(entries, entry => {
    const isSelected = inventory.name === entry.inventory.name;
    const price = isSelected && !isFetching
      ? getSummaryPrice(items)
      : null;

    return (
      <OnlineCheckoutInventory
        entry={entry}
        isSelected={isSelected}
        key={entry.inventory.name}
        price={price}
        onSelect={partial(onInventorySelect, entry.inventory)}
      />
    );
  });

  return (
    <div className="OnlineCheckoutInventories">
      {entryList}
    </div>
  );
};

OnlineCheckoutInventories.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      inventory: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  inventory: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.array.isRequired,
  onInventorySelect: PropTypes.func.isRequired,
};

export default OnlineCheckoutInventories;
