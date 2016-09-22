
import React, { PropTypes } from 'react';

import getSummaryPrice from 'reducers/onlineCheckout/helpers/getSummaryPrice';

import iconClose from 'assets/images/icons/icon-close.svg';
import iconLogo from 'assets/images/icons/whisk-logo.svg';
import './styles.css';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

import OnlineCheckoutSendItems from 'components/pages/OnlineCheckout/SendItems';
import OnlineCheckoutInventories from 'components/pages/OnlineCheckout/Inventories';
import OnlineCheckoutViewSelector from 'components/pages/OnlineCheckout/ViewSelector';

const OnlineCheckoutHeader = ({
  inventory, entries, items, isFetching,
  onClose, onLogoClick, onSend, onInventorySelect,
}) => (
  <div className="OnlineCheckoutHeader">
    <div className="OnlineCheckoutHeader-area OnlineCheckoutHeader-area--upper">
      <div
        className="OnlineCheckoutHeader-logo"
        onClick={onLogoClick}
      >
        <Icon
          glyph={iconLogo}
          style={{ height: 30, width: 83 }}
        />
      </div>

      <div className="OnlineCheckoutHeader-inventories">
        <OnlineCheckoutInventories />
      </div>

      <div className="OnlineCheckoutHeader-send OnlineCheckoutHeader-send--mobile">
        <OnlineCheckoutSendItems
          entries={entries}
          inventory={inventory}
          price={isFetching ? null : getSummaryPrice(items)}
          onInventorySelect={onInventorySelect}
          onSend={onSend}
        />
      </div>

      <div className="OnlineCheckoutHeader-close OnlineCheckoutHeader-close--desktop">
        <Button
          color="grey"
          icon={iconClose}
          iconStyle={{ height: 14, width: 14 }}
          onClick={onClose}
        >
          Close checkout
        </Button>
      </div>
      <div className="OnlineCheckoutHeader-close OnlineCheckoutHeader-close--mobile">
        <Button
          color="grey"
          icon={iconClose}
          iconStyle={{ height: 14, width: 14 }}
          onClick={onClose}
        />
      </div>
    </div>

    <div className="OnlineCheckoutHeader-area OnlineCheckoutHeader-area--lower">
      <OnlineCheckoutViewSelector />

      <div className="OnlineCheckoutHeader-send OnlineCheckoutHeader-send--desktop">
        <Button onClick={onSend}>
          Send to {inventory.name}
        </Button>
      </div>
    </div>
  </div>
);

OnlineCheckoutHeader.propTypes = {
  entries: PropTypes.array.isRequired,
  inventory: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onInventorySelect: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default OnlineCheckoutHeader;
