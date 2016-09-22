
import React, { PropTypes } from 'react';

import './styles.css';

import Button from 'components/ui-elements/Button';
import PredefinedOptions from 'components/ui-elements/PredefinedOptions';

const FrequentlyUsed = ({ options, onClick, onClose }) => (
  <div className="ShoppingList-frequentlyUsed">
    <PredefinedOptions
      label="Frequently Used"
      options={options}
      onClick={onClick}
    />

    <Button
      className="ShoppingList-returnButton"
      outline
      onClick={onClose}
    >
      Return to list
    </Button>
  </div>
);

FrequentlyUsed.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      selected: PropTypes.bool,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FrequentlyUsed;
