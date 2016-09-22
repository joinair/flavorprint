
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import partial from 'lodash/partial';

import './styles.css';

import OnboardingBubble from './OnboardingBubble';

const OnboardingBubbleList = ({ items, value, large, itemsStyle, onChange }) => {
  const listClasses = classnames(
    'OnboardingBubbleList',
    { 'OnboardingBubbleList--large': large }
  );

  const listItems = map(items, (item, key) =>
    <OnboardingBubble
      {...item}
      checked={
        isArray(value)
          ? includes(value, item.value)
          : item.value === value
      }
      key={key}
      style={itemsStyle}
      onChange={partial(onChange, item.value)}
    />
  );

  return (
    <div className={listClasses}>
      {listItems}
    </div>
  );
};

OnboardingBubbleList.propTypes = {
  large: PropTypes.bool,
  items: PropTypes.array.isRequired,
  itemsStyle: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array, PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
};

export default OnboardingBubbleList;
