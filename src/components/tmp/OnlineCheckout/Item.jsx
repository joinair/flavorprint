
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import get from 'lodash/get';

import formatPrice from 'helpers/formatPrice';

import { imageTransformation } from 'helpers/cloudinary';

const transformation = 'c_fill,dpr_2.0,w_40,h_40,f_auto';

const Item = props => {
  const { item, recipes } = props;
  const { key } = item;
  const { recipe, text } = key;

  const recipeName = recipes && recipe && get(recipes[recipe], 'data.name');
  const recipeInfo = recipeName && (
    <p className="OnlineCheckoutItem-recipeInfo">{recipeName}</p>
  );

  const siDecision = get(item, 'siDecision');
  const currency = get(siDecision, 'item.currency');
  const price = get(siDecision, 'item.price', 0);
  const quantity = get(siDecision, 'qty.value', 1);
  const imageUrl = get(siDecision, 'item.imageUrl');

  const itemInfo = !siDecision
    ? <div><a href="/"> Find product</a></div>
    : (
      <div>
        <img
          alt=""
          className="OnlineCheckoutItem-image"
          src={imageTransformation(imageUrl, transformation)}
          key={imageUrl}
        />
        {get(siDecision, 'item.name')}
        <a href="/"> Swap</a>
      </div>
    );

  const quantityInfo = siDecision && (
    <div>
      <i className="arrow up icon" />
      {quantity}
      <i className={classnames('arrow down icon', { disabled: quantity === 1 })} />
    </div>
  );

  const formatedPrice = siDecision && formatPrice(price, currency);
  const priceInfo = siDecision && (
    <div>
      <i className={classnames(formatedPrice.icon, 'icon')} />
      {formatedPrice.priceString}
    </div>
  );

  return (
    <div className="ui grid OnlineCheckoutItem">
      <div className="six wide column">
        {text}
        {recipeInfo}
      </div>

      <div className="six wide column">{itemInfo}</div>
      <div className="two wide column">{quantityInfo}</div>
      <div className="two wide column">{priceInfo}</div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.shape({
      text: PropTypes.string.isRequired,
      recipe: PropTypes.string,
    }).isRequired,
  }).isRequired,

  recipes: PropTypes.object,
};

export default Item;
