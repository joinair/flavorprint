/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';

import partial from 'lodash/partial';

import './styles.css';

import AddToList from
  'components/tmp/ShoppingList/ShoppingListActions/AddToList';
import CategoriesView from './CategoriesView';
import Inventories from './Inventories';
import RecipesView from './RecipesView';
import Summary from './Summary';

import ShoppingListFilters from 'constants/ShoppingListFilters';

const ViewSelector = ({ view, onViewChange }) =>
  view === ShoppingListFilters.RECIPE
    ? (
      <span>
        <span>Sort by: </span>
        <strong>Recipe</strong>
        <span> / </span>
        <a onClick={partial(onViewChange, ShoppingListFilters.AISLE)}>
          Aisle
        </a>
      </span>
    ) : (
      <span>
        <span>Sort by: </span>
        <a onClick={partial(onViewChange, ShoppingListFilters.RECIPE)}>
          Recipe
        </a>
        <span> / </span>
        <strong>Aisle</strong>
      </span>
    );

class OnlineCheckout extends Component {
  render() {
    const { view, onClose, onViewChange } = this.props;

    const content = view === ShoppingListFilters.RECIPE
      ? <RecipesView />
      : <CategoriesView />;

    return (
      <div>
        <div className="ui basic center aligned segment">
          <Inventories />
        </div>

        <div className="ui basic segment">
          <div className="ui form grid">
            <div className="one wide column" />

            <div className="three wide column">
              <AddToList />
            </div>

            <div className="two wide column">
              <ViewSelector view={view} onViewChange={onViewChange} />
            </div>

            <div className="seven wide column" />

            <div className="one wide column">
              <i className="large bordered close icon" onClick={onClose} />
            </div>
          </div>
        </div>

        <div className="ui basic segment">
          <div className="ui container">
            {content}
          </div>
        </div>

        <div className="ui basic right aligned segment">
          <Summary />
        </div>
      </div>
    );
  }
}

ViewSelector.propTypes = {
  view: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
};

OnlineCheckout.propTypes = {
  view: PropTypes.string.isRequired,

  onClose: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
};

export default OnlineCheckout;
