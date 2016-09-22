
import React, { PropTypes } from 'react';

import assign from 'lodash/assign';

const EmptyList = ({ isTizenFridge }) => {
  const imageProps = assign(
    {
      className: 'ShoppingList-emptyList-image',
      src: '/assets/images/static-images/empty-shopping-list.png',
      srcSet: '/assets/images/static-images/empty-shopping-list@2x.png 2x',
      title: 'Empty shopping list',
    },
    isTizenFridge
      ? { src: '/assets/images/static-images/empty-shopping-list@2x.png' }
      : {}
  );

  return (
    <div className="ShoppingList-emptyList">
      <div className="ShoppingList-emptyList-container">
        <div className="ShoppingList-emptyList-imageContainer">
          <img {...imageProps} alt="Empty shopping list" />
        </div>
        <div className="ShoppingList-emptyList-message">
          <span className="ShoppingList-emptyList-messageHeader">
            Start your shopping list
          </span>
          Add weekly essentials and entire recipes
        </div>
      </div>
    </div>
  );
};

EmptyList.propTypes = {
  isTizenFridge: PropTypes.bool,
};

export default EmptyList;
