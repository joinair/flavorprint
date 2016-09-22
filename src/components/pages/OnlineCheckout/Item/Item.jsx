
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import get from 'lodash/get';

import formatPrice from 'helpers/formatPrice';

import './styles.css';

import CloudinaryImage from 'components/ui-elements/CloudinaryImage';
import Counter from 'components/ui-elements/Counter';

const preventWithCallback = callback => event => {
  event.preventDefault();
  callback();
};

const OnlineCheckoutItem = ({ item, onFind, onSwap, onQuantityChange }) => {
  const { siDecision, key: { text } } = item;

  if (!siDecision) {
    return (
      <div className="OnlineCheckoutItem OnlineCheckoutItem--notFound">
        <div className="OnlineCheckoutItem-inner">
          <div className="OnlineCheckoutItem-nameColumn">
            {text}
          </div>

          <div className="OnlineCheckoutItem-imageContainer">
            <div className="OnlineCheckoutItem-image">?</div>
          </div>

          <div className="OnlineCheckoutItem-content">
            <div className="OnlineCheckoutItem-name">
              {text}
            </div>
            <div className="OnlineCheckoutItem-recipe">
              Product not found{' '}
              <a
                className="OnlineCheckoutItem-link"
                href="#"
                onClick={preventWithCallback(onFind)}
              >
                Search
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const price = get(siDecision, 'item.price', 0);
  const currency = get(siDecision, 'item.currency');

  const quantity = get(siDecision, 'qty.value', 1);
  const itemClasses = classnames('OnlineCheckoutItem', {
    'is-notActive': quantity === 0,
  });

  const formattedPrice = formatPrice(price * quantity, currency);

  return (
    <div className={itemClasses}>
      <div className="OnlineCheckoutItem-inner">
        <div className="OnlineCheckoutItem-nameColumn">
          {text}
        </div>

        <div className="OnlineCheckoutItem-imageContainer">
          <CloudinaryImage
            className="OnlineCheckoutItem-image"
            transformation="c_fill,w_60,h_60,f_auto"
            url={get(siDecision, 'item.imageUrl')}
          />
        </div>

        <div className="OnlineCheckoutItem-content">
          <div className="OnlineCheckoutItem-main">
            <div className="OnlineCheckoutItem-name">
              {text}
            </div>
            <div className="OnlineCheckoutItem-recipe">
              {get(siDecision, 'item.name')}{' '}
              <a
                className="OnlineCheckoutItem-link"
                href="#"
                onClick={preventWithCallback(onSwap)}
              >
                Swap
              </a>
            </div>
          </div>

          <div className="OnlineCheckoutItem-footer">
            <div className="OnlineCheckoutItem-price">
              {formattedPrice.symbol}{formattedPrice.priceString}
            </div>
            <div className="OnlineCheckoutItem-quantity">
              <Counter
                value={quantity}
                onChange={onQuantityChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OnlineCheckoutItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.shape({
      recipe: PropTypes.string,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onFind: PropTypes.func.isRequired,
  onSwap: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default OnlineCheckoutItem;
