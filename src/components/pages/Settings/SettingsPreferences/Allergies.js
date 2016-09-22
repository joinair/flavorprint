
import React, { PropTypes } from 'react';

import concat from 'lodash/concat';
import find from 'lodash/find';
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
    map(items, item => ({ label: item.text, value: item.canonicalName })),
    emptyItem
  );

const prepareValue = value => {
  if (value === undefined) return undefined;

  return isEmpty(value)
    ? null
    : map(value, item => item.canonicalName);
};

const Allergies = ({ items, value, onChange }) => {
  const handleChange = (key, checked) => {
    let nextValue = value || [];

    if (key !== null) {
      const item = find(items, { canonicalName: key });

      nextValue = checked
        ? concat(nextValue, item)
        : reject(nextValue, item);
    } else {
      nextValue = [];
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

Allergies.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default Allergies;
