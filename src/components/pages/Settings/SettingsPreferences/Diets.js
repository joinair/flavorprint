
import React, { PropTypes } from 'react';

import concat from 'lodash/concat';
import get from 'lodash/get';
import find from 'lodash/find';
import map from 'lodash/map';

import CheckboxList from 'components/pages/Settings/CheckboxList';

const emptyItem = {
  label: 'Eat most things',
  value: null,
};

const prepareItems = items =>
  concat(
    map(items, item => ({ label: item.text, value: item.canonicalName })),
    emptyItem
  );

const prepareValue = field =>
  field === undefined
    ? undefined
    : get(field, 'canonicalName', null);

const Diets = ({ items, value, onChange }) => {
  const handleChange = key => {
    const nextValue = key
      ? find(items, { canonicalName: key })
      : null;

    onChange(nextValue);
  };

  return (
    <CheckboxList
      items={prepareItems(items)}
      type="radio"
      value={prepareValue(value)}
      onChange={handleChange}
    />
  );
};

Diets.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.shape({
    canonicalName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
};

export default Diets;
