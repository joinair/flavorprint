
import React, { PropTypes } from 'react';

import Preloader from 'components/ui-elements/Preloader';

const SendingItems = ({ inventory }) => (
  <div className="CheckoutProcessModal-sendingItems">
    <Preloader />

    <div className="CheckoutProcessModal-sendingItems-title">
      Sending items to {inventory.name}
    </div>

    <div className="CheckoutProcessModal-sendingItems-description">
      We’re adding items from your shopping list to your {inventory.name} basket.
    </div>
  </div>
);

SendingItems.propTypes = {
  inventory: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default SendingItems;
