
import React, { PropTypes } from 'react';

import get from 'lodash/get';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import classnames from 'classnames';

import iconDish from 'assets/images/icons/icon-dish.svg';
import './PrintListKey.css';

import CloudinaryImage from 'components/ui-elements/CloudinaryImage';
import Icon from 'components/ui-elements/Icon';

const KeyItem = ({ index, item }) => {
  const image = get(item.data, 'image.url')
    ? (
      <CloudinaryImage
        className="RecipeKey-image"
        transformation="c_fill,f_auto,w_60,h_60"
        url={item.data.image.url}
      />
    ) : (
      <div className="RecipeKey-image-fallback">
        <Icon
          className="RecipeKey-image-fallback-icon"
          glyph={iconDish}
        />
      </div>
    );

  return (
    <li className="RecipeKey-item">
      <div className="RecipeKey-imageKey">
        <span className="RecipeKey-key">{index + 1}</span>
        {image}
      </div>

      <div className="RecipeKey-text">
        <h5 className="RecipeKey-title">{item.data.name}</h5>
        <p className="RecipeKey-website">{get(item.data, 'publisher.name')}</p>
      </div>
    </li>
  );
};

const PrintListKey = ({ recipes, isKeyVisible }) => {
  const content = map(sortBy(recipes, 'data.name'), (item, index) =>
    <KeyItem key={index} index={index} item={item} />);

  return (
    <div className={classnames('PrintListKey', { 'is-keyVisible': isKeyVisible })}>
      <h4 className="PrintListKey-title">Recipes in your list</h4>

      <ul className="RecipeKey">
        {content}
      </ul>
    </div>
  );
};

KeyItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

PrintListKey.propTypes = {
  recipes: PropTypes.object.isRequired,
  isKeyVisible: PropTypes.bool.isRequired,
};

export default PrintListKey;
