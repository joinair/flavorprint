
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import './styles.css';

import CloudinaryImage from 'components/ui-elements/CloudinaryImage';

const OnlineCheckoutInventory = ({ entry, price, isSelected, onSelect }) => {
  const rootClasses = classnames('OnlineCheckoutInventory', {
    'OnlineCheckoutInventory--price': price,
    'is-selected': isSelected,
  });

  return (
    <div
      className={rootClasses}
      onClick={isSelected ? undefined : onSelect}
    >
      <div className="OnlineCheckoutInventory-imageContainer">
        <CloudinaryImage
          className="OnlineCheckoutInventory-image"
          title={entry.inventory.name}
          transformation="h_25,f_auto,c_fit"
          url={entry.image}
        />
      </div>

      {price &&
        <div className="OnlineCheckoutInventory-price">
          {price.symbol}{price.priceString}
        </div>
      }
    </div>
  );
};

OnlineCheckoutInventory.propTypes = {
  entry: PropTypes.shape({
    image: PropTypes.string.isRequired,
    inventory: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  price: PropTypes.shape({
    priceString: PropTypes.string.isRequired,
    symbol: PropTypes.string,
  }),
  onSelect: PropTypes.func.isRequired,
};

export default OnlineCheckoutInventory;
