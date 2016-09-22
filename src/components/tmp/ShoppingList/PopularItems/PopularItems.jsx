
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import isNumber from 'lodash/isNumber';
import map from 'lodash/map';
import partial from 'lodash/partial';

import './styles.css';

const Item = ({ text, selected, onClick }) => {
  const className = classnames('ShoppingList-popularItem', {
    'is-selected': selected,
  });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
};

const PopularItems = ({ options, selectedIndex, text, onClick }) => {
  const textToMatch = text.toLowerCase();

  const content = map(options, (option, index) =>
    <Item
      key={option.text}
      selected={
        isNumber(selectedIndex)
          ? index === selectedIndex
          : option.text === textToMatch
      }
      text={option.text}
      onClick={partial(onClick, option)}
    />
  );

  return (
    <div className="ShoppingList-popularItems">
      {content}
    </div>
  );
};

Item.propTypes = {
  selected: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

PopularItems.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  selectedIndex: PropTypes.number,
  text: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,
};

export default PopularItems;
