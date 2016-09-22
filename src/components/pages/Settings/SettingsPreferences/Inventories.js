
import React, { PropTypes } from 'react';

import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import reject from 'lodash/reject';

import CheckboxList from 'components/pages/Settings/CheckboxList';

const emptyItem = {
  label: 'None of these',
  value: null,
};

const prepareItems = items =>
  concat(
    map(items, item => ({ label: item.name, value: item.name })),
    emptyItem
  );

const prepareValue = value => {
  if (value === undefined) return undefined;

  return isEmpty(value) ? null : value;
};

const Inventories = ({ items, value, onChange }) => {
  const handleChange = (key, checked) => {
    let nextValue = value || [];

    if (key !== null) {
      nextValue = checked
        ? concat(nextValue, key)
        : reject(nextValue, item => item === key);
    }

    onChange(nextValue);
  };

  return (
    <CheckboxList
      items={prepareItems(items)}
      value={prepareValue(value)}
      onChange={handleChange}
    />
  );
};

Inventories.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default Inventories;
