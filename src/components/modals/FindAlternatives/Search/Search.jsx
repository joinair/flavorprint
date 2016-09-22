
import React, { PropTypes } from 'react';

import iconSearch from 'assets/images/icons/icon-search.svg';
import './styles.css';

import Input from 'components/ui-elements/Input';

const FindAlternativesSearch = ({ term, inventory, onTermChange }) => (
  <div className="FindAlternativesSearch">
    <Input
      className="FindAlternativesSearch-field"
      icon={iconSearch}
      iconBefore={false}
      iconStyle={{ height: 18, width: 18 }}
      placeholder={`Search ${inventory.name} products`}
      value={term}
      onChange={onTermChange}
    />
  </div>
);

FindAlternativesSearch.propTypes = {
  inventory: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  term: PropTypes.string.isRequired,
  onTermChange: PropTypes.func.isRequired,
};

export default FindAlternativesSearch;
