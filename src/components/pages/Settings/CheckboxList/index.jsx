
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';
import map from 'lodash/map';
import partial from 'lodash/partial';

import './styles.css';

import Checkbox from 'components/ui-elements/Checkbox';

const CheckboxList = ({ inline, items, type, value, onChange }) => {
  const listClasses = classnames(
    'CheckboxList',
    {
      'CheckboxList--inline': inline,
      'CheckboxList--columns': !inline,
    }
  );

  const listItems = map(items, (item, key) =>
    <Checkbox
      checked={
        isArray(value)
          ? includes(value, item.value)
          : item.value === value
      }
      key={key}
      label={item.label}
      type={type}
      onChange={partial(onChange, item.value)}
    />
  );

  let content = listItems;

  if (!inline) {
    const itemsPerColumn = Math.ceil(listItems.length / 2);

    content = (
      <div className="CheckboxList-columns">
        <div className="CheckboxList-column">
          {listItems.slice(0, itemsPerColumn)}
        </div>
        <div className="CheckboxList-column">
          {listItems.slice(itemsPerColumn)}
        </div>
      </div>
    );
  }

  return (
    <div className={listClasses}>
      {content}
    </div>
  );
};

CheckboxList.propTypes = {
  inline: PropTypes.bool,
  items: PropTypes.array.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
};

export default CheckboxList;
