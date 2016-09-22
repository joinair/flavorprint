
import React, { PropTypes } from 'react';

import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import formatPrice from 'helpers/formatPrice';

import Button from 'components/ui-elements/Button';
import CloudinaryImage from 'components/ui-elements/CloudinaryImage';

const UnavailableItem = ({ item }) => {
  const price = item.storeItem.price || 0;
  const currency = item.storeItem.currency;
  const formattedPrice = formatPrice(price, currency);

  return (
    <div className="CheckoutProcessModal-complete-item">
      <div className="CheckoutProcessModal-complete-item-inner">
        <div className="CheckoutProcessModal-complete-item-imageContainer">
          <CloudinaryImage
            className="CheckoutProcessModal-complete-item-image"
            transformation="c_fill,w_60,h_60,f_auto"
            url={item.storeItem.imageUrl}
          />
        </div>

        <div className="CheckoutProcessModal-complete-item-content">
          <div className="CheckoutProcessModal-complete-item-main">
            <div className="CheckoutProcessModal-complete-item-recipe">
              {item.storeItem.name}
            </div>
          </div>

          <div className="CheckoutProcessModal-complete-item-price">
            {formattedPrice.symbol}{formattedPrice.priceString}
          </div>
        </div>
      </div>
    </div>
  );
};

const UnavailableItems = ({ inventory, items }) => (
  <div className="CheckoutProcessModal-complete-unavailable">
    <div className="CheckoutProcessModal-complete-excuse">
      Sorry, some items are unavailable at {inventory.name} and
      weren’t added to your basket.
    </div>

    <div className="CheckoutProcessModal-complete-items">
      {map(items, (item, i) =>
        <UnavailableItem item={item} key={i} />
      )}
    </div>
  </div>
);

const Complete = ({ data, onBack }) => {
  const unavailableItems = filter(data.items, item =>
    item.status.code === 'Failed'
  );

  return (
    <div className="CheckoutProcessModal-complete">
      <h2 className="CheckoutProcessModal-complete-title">
        Almost done! Go to
        <a href={data.checkoutUrl} target="_blank">
          {` ${data.inventory.name} `}
        </a>
        to confirm your order and pay.
      </h2>

      <div className="CheckoutProcessModal-complete-actions">
        <a
          className="CheckoutProcessModal-complete-action"
          href={data.checkoutUrl}
          target="_blank"
        >
          <Button fluid size="large">
            Go to your {data.inventory.name} basket
          </Button>
        </a>

        <Button
          className="CheckoutProcessModal-complete-action"
          outline
          size="large"
          onClick={onBack}
        >
          Back to Whisk.com
        </Button>
      </div>

      {!isEmpty(unavailableItems) &&
        <UnavailableItems
          inventory={data.inventory}
          items={unavailableItems}
        />
      }
    </div>
  );
};

UnavailableItem.propTypes = {
  item: PropTypes.object.isRequired,
};

UnavailableItems.propTypes = {
  inventory: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

Complete.propTypes = {
  data: PropTypes.shape({
    checkoutUrl: PropTypes.string.isRequired,
    inventory: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Complete;
