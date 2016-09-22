
import React, { PropTypes } from 'react';

import get from 'lodash/get';
import map from 'lodash/map';
import reverse from 'lodash/reverse';

import CheckboxList from 'components/pages/Settings/CheckboxList';

const labels = {
  Easy: 'Amateur',
  Medium: 'Intermediate',
  Hard: 'Advanced',
};

const prepareItems = items =>
  reverse(map(items, item => ({
    label: get(labels, item, item),
    value: item,
  })));

const Difficulty = ({ items, value, onChange }) => (
  <CheckboxList
    items={prepareItems(items)}
    type="radio"
    value={value}
    onChange={onChange}
  />
);

Difficulty.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Difficulty;
