/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';

import { RECIPE } from 'constants/ShoppingListFilters';

import './styles.css';

import Preloader from 'components/ui-elements/Preloader';

import OnlineCheckoutPlaceholder from './Placeholder';
import OnlineCheckoutHeader from './Header';

import CategoriesView from './CategoriesView';
import RecipesView from './RecipesView';
import Summary from './Summary';

class OnlineCheckout extends Component {
  render() {
    const { view, items, isFetching } = this.props;

    const isEmpty = items.length === 0;
    const itemList = view === RECIPE ? <RecipesView /> : <CategoriesView />;

    return (
      <div className="OnlineCheckout">
        <div className="OnlineCheckout-inner">
          <div className="OnlineCheckout-content">
            <OnlineCheckoutHeader />

            {isFetching &&
              <Preloader className="OnlineCheckout-preloader" />
            }

            {!isFetching && isEmpty &&
              <OnlineCheckoutPlaceholder />
            }

            {!isFetching && !isEmpty && itemList}
            {!isFetching && !isEmpty && <Summary />}
          </div>
        </div>
      </div>
    );
  }
}

OnlineCheckout.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired,
};

export default OnlineCheckout;
