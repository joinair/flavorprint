
import React, { PropTypes } from 'react';

import filter from 'lodash/filter';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import CheckboxGroup from './CheckboxGroup';

const CheckboxesFilter = ({
  value,
  onChange,
  options,
  facetsHits,
  singleColumn,
  type,
}) => {
  const showFacets = false;
  const groupOptions = map(
    sortBy(options, 'text'),
    ({ canonicalName, text }) => ({
      value: canonicalName,
      label: text,
      count: showFacets && facetsHits[canonicalName],
    })
  );

  const groupValue = map(value, ({ canonicalName }) => canonicalName);

  const groupOnChange = (newGroupValue) => {
    const newValue = filter(
      options,
      v => newGroupValue.indexOf(v.canonicalName) >= 0
    );
    onChange(newValue);
  };

  return (
    <CheckboxGroup
      type={type}
      options={groupOptions}
      value={groupValue}
      onChange={groupOnChange}
      columns={singleColumn ? 1 : 2}
    />
  );
};

CheckboxesFilter.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  facetsHits: PropTypes.object,
  singleColumn: PropTypes.bool,
};

CheckboxesFilter.defaultProps = {
  type: 'checkbox',
  facetsHits: {},
  splitWords: false,
  singleColumn: false,
};

export default CheckboxesFilter;
