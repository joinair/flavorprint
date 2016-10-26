
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import partial from 'lodash/partial';
import chunk from 'lodash/chunk';

import './styles.css';

import OnboardingBubble from './OnboardingBubble';

const OnboardingBubbleList = ({
  items,
  value,
  large,
  itemsStyle,
  onChange,
  columns,
}) => {
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

  const groups = chunk(listItems, columns);

  return (
    <div className={listClasses}>
      {map(groups, (group, key) => (
        <div className="OnboardingBubbleList-group" key={key}>
          {group}
        </div>
      ))}
    </div>
  );
};

OnboardingBubbleList.propTypes = {
  large: PropTypes.bool,
  items: PropTypes.array.isRequired,
  itemsStyle: PropTypes.string,
  columns: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array, PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
};

OnboardingBubbleList.defaultProps = {
  columns: 5,
};

export default OnboardingBubbleList;
