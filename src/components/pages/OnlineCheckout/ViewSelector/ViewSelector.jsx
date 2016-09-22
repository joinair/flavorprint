
import React, { PropTypes } from 'react';

import partial from 'lodash/partial';

import { RECIPE, AISLE } from 'constants/ShoppingListFilters';

import './styles.css';

import Checkbox from 'components/ui-elements/Checkbox';

const OnlineCheckoutViewSelector = ({ view, onSelect }) => (
  <div className="OnlineCheckoutViewSelector">
    <div className="OnlineCheckoutViewSelector-item">
      Sort by:{' '}
    </div>

    <div className="OnlineCheckoutViewSelector-item">
      <Checkbox
        checked={view === RECIPE}
        label="Recipe"
        type="radio"
        onChange={partial(onSelect, RECIPE)}
      />
    </div>

    <div className="OnlineCheckoutViewSelector-item">
      <Checkbox
        checked={view === AISLE}
        label="Aisle"
        type="radio"
        onChange={partial(onSelect, AISLE)}
      />
    </div>
  </div>
);

OnlineCheckoutViewSelector.propTypes = {
  view: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default OnlineCheckoutViewSelector;
