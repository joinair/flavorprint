
import React, { Component, PropTypes } from 'react';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import classnames from 'classnames';

import { on, off } from 'helpers/event';

import ShoppingListFilters from 'constants/ShoppingListFilters';

import iconClose from 'assets/images/icons/icon-close.svg';
import './styles.css';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

import GotIt from './GotIt';
import ItemsAutocomplete, { AUTOCOMPLETE_TYPES } from './ItemsAutocomplete';
import FrequentlyUsed from './FrequentlyUsed';
import PopularItems from './PopularItems';
import StoreDropdown from './StoreDropdown';
import Settings from './Settings';
import UncheckedByCategories from './UncheckedByCategories';
import UncheckedByRecipes from './UncheckedByRecipes';
import EmptyList from './EmptyList';

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.handleAutocompleteClose = bind(this.handleAutocompleteClose, this);
    this.handleDocumentClick = bind(this.handleDocumentClick, this);

    this.state = {
      autocomplete: {
        open: false,
        options: [],
        selectedIndex: null,
        text: '',
        type: null,
      },
    };
  }

  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }

  handleAutocompleteClose() {
    this.refs.autocomplete.getWrappedInstance().close();
  }

  handleDocumentClick(event) {
    if (event.target === this.refs.overlay) {
      this.handleAutocompleteClose();
    }
  }

  render() {
    const {
      hasItems, inventories, view, isTizenFridge,
      onShoppingListUseInStore,
    } = this.props;
    const { autocomplete } = this.state;

    const onAutocompleteUpdate = autocompleteState => {
      this.setState({ autocomplete: assign({}, autocomplete, autocompleteState) });
    };

    const uncheckedItems = view === ShoppingListFilters.RECIPE
      ? <UncheckedByRecipes />
      : <UncheckedByCategories />;

    const settingsOrCloseButton = autocomplete.open
     ? (
       <div
         className="ShoppingList-addSection-icon"
         onClick={this.handleAutocompleteClose}
       >
         <Icon className="ShoppingList-closeButton" glyph={iconClose} />
       </div>
     ) : <Settings />;

    const overlay = autocomplete.open &&
      <div ref="overlay" className="ShoppingList-section-overlay" />;

    const options =
      autocomplete.open &&
      (
        autocomplete.type === AUTOCOMPLETE_TYPES.FREQUENTLY_USED
          ? (
            <div className="ShoppingList-dropdownAddToList">
              <FrequentlyUsed onClose={this.handleAutocompleteClose} />
            </div>
          ) : (
            <div className="ShoppingList-dropdownAddToList">
              <PopularItems
                options={autocomplete.options}
                selectedIndex={autocomplete.selectedIndex}
                text={autocomplete.text}
                onClose={this.handleAutocompleteClose}
              />
            </div>
          )
      );

    const items = hasItems
      ? (
        <div className="ShoppingList-items">
          {uncheckedItems}
          <GotIt />
        </div>
      ) : (
        <EmptyList isTizenFridge={isTizenFridge} />
      );

    const actionsClass = classnames('ShoppingList-actions', {
      'ShoppingList-actions--flex': !inventories.length,
    });

    const buyOnlineButton = !!inventories.length && (
      <StoreDropdown />
    );

    return (
      <div
        className={
          classnames('ShoppingList', { 'is-inputing': autocomplete.open })
        }
      >
        <div className="ShoppingList-inner">
          <div className={actionsClass}>
            <Button
              className="ShoppingList-actions-button"
              fluid={!buyOnlineButton}
              media="s-large"
              onClick={onShoppingListUseInStore}
            >
              Use in store
            </Button>

            {buyOnlineButton}
          </div>

          <div className="ShoppingList-addSection">
            <div className="ShoppingList-addSection-row">
              <ItemsAutocomplete
                ref="autocomplete"
                {...autocomplete}
                onUpdate={onAutocompleteUpdate}
              />

              {settingsOrCloseButton}
            </div>
          </div>

          <div className="ShoppingList-section">
            {overlay}
            {options}
            {items}
          </div>
        </div>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  hasItems: PropTypes.bool.isRequired,
  inventories: PropTypes.array.isRequired,
  isTizenFridge: PropTypes.bool,
  view: PropTypes.string.isRequired,
  onShoppingListUseInStore: PropTypes.func.isRequired,
};

export default ShoppingList;
