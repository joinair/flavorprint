
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import classnames from 'classnames';
import map from 'lodash/map';
import partial from 'lodash/partial';
import size from 'lodash/size';

import { on, off } from 'helpers/event';

import iconArrowDown from 'assets/images/icons/icon-arrow-down.svg';
import './styles.css';

import Button from 'components/ui-elements/Button';
import CloudinaryImage from 'components/ui-elements/CloudinaryImage';

const DropdownItem = ({ item, selected, onSelect }) => (
  <div
    className={
      classnames('StoreDropdown-dropdownItem', { 'is-selected': selected })
    }
    onClick={onSelect}
  >
    <CloudinaryImage
      className="StoreDropdown-dropdownItem-image"
      title={item.inventory.name}
      transformation="h_30,f_auto"
      url={item.image}
    />
  </div>
);

const Dropdown = ({ items, selected, onItemSelect }) => (
  <div className="StoreDropdown-dropdown">
    {map(items, item =>
      <DropdownItem
        item={item}
        key={item.inventory.name}
        selected={selected.inventory.name === item.inventory.name}
        onSelect={partial(onItemSelect, item)}
      />
    )}
  </div>
);

// FIXME: DropdownButton component

class StoreDropdown extends Component {
  constructor(props) {
    super(props);

    this.handleBuyButtonClick = bind(this.handleBuyButtonClick, this);
    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.handleInventorySelect = bind(this.handleInventorySelect, this);
    this.toggleOpenState = bind(this.toggleOpenState, this);

    this.state = {
      inventory: props.inventories[0],
      isOpen: false,
    };
  }

  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }

  handleBuyButtonClick() {
    this.props.onCheckout(this.state.inventory);
  }

  handleInventorySelect(inventory) {
    this.setState({ inventory, isOpen: false });
  }

  toggleOpenState() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleDocumentClick(event) {
    if (!this.state.isOpen) return undefined;

    if (!findDOMNode(this).contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { inventories } = this.props;
    const { inventory, isOpen } = this.state;

    const hasOneInventory = size(inventories) === 1;

    return (
      <div className="StoreDropdown">
        <Button
          className={
            classnames(
              'StoreDropdown-button',
              { 'StoreDropdown-button--withToggle': !hasOneInventory }
            )
          }
          media="s-large"
          onClick={this.handleBuyButtonClick}
        >
          <span className="StoreDropdown-button-text">
            Buy online
          </span>
          <span className="StoreDropdown-button-text StoreDropdown-button-text--desktop">
            Buy online - {''}
            <CloudinaryImage
              className="StoreDropdown-button-image"
              title={inventory.inventory.name}
              transformation="e_colorize,co_white,h_15,f_auto"
              url={inventory.image}
            />
          </span>
        </Button>
        {size(inventories) > 1 &&
          <Button
            className="StoreDropdown-toggle"
            icon={iconArrowDown}
            iconStyle={{ height: 7, width: 12 }}
            media="s-large"
            onClick={this.toggleOpenState}
          />
        }
        {isOpen &&
          <Dropdown
            items={inventories}
            selected={inventory}
            onItemSelect={this.handleInventorySelect}
          />
        }
      </div>
    );
  }
}

DropdownItem.propTypes = {
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

StoreDropdown.propTypes = {
  inventories: PropTypes.arrayOf(
    PropTypes.shape({
      inventory: PropTypes.shape({
        name: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
      }).isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default StoreDropdown;
