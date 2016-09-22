
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import classnames from 'classnames';
import map from 'lodash/map';
import partial from 'lodash/partial';

import { on, off } from 'helpers/event';

import iconArrowDown from 'assets/images/icons/icon-arrow-down.svg';
import './styles.css';

import CloudinaryImage from 'components/ui-elements/CloudinaryImage';
import Icon from 'components/ui-elements/Icon';

const DropdownItem = ({ item, selected, onSelect }) => (
  <div
    className={
      classnames('OnlineCheckoutSendItems-dropdownItem', { 'is-selected': selected })
    }
    onClick={onSelect}
  >
    <CloudinaryImage
      className="OnlineCheckoutSendItems-dropdownItem-image"
      title={item.inventory.name}
      transformation="h_30,f_auto"
      url={item.image}
    />
  </div>
);

const Dropdown = ({ items, selected, onItemSelect }) => (
  <div className="OnlineCheckoutSendItems-dropdown">
    {map(items, item =>
      <DropdownItem
        item={item}
        key={item.inventory.name}
        selected={selected.name === item.inventory.name}
        onSelect={partial(onItemSelect, item.inventory)}
      />
    )}
  </div>
);

class OnlineCheckoutSendItems extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.handleInventorySelect = bind(this.handleInventorySelect, this);
    this.handleSendButtonClick = bind(this.handleSendButtonClick, this);
    this.toggleOpenState = bind(this.toggleOpenState, this);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }

  handleDocumentClick(event) {
    if (!this.state.isOpen) return undefined;

    if (!findDOMNode(this).contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  handleInventorySelect(inventory) {
    this.props.onInventorySelect(inventory);
    this.setState({ isOpen: false });
  }

  handleSendButtonClick() {
    this.props.onSend();
    this.setState({ isOpen: false });
  }

  toggleOpenState() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { inventory, entries, price } = this.props;
    const { isOpen } = this.state;

    const oneShop = entries.length < 2;
    const rootClasses = classnames('OnlineCheckoutSendItems', {
      'OnlineCheckoutSendItems--oneShop': oneShop,
    });

    return (
      <div className={rootClasses}>
        <div
          className="OnlineCheckoutSendItems-button OnlineCheckoutSendItems-button--send"
          onClick={this.handleSendButtonClick}
        >
          <div className="OnlineCheckoutSendItems-text">
            Send to {inventory.name}
          </div>

          {price &&
            <div className="OnlineCheckoutSendItems-priceBadge">
              {price.symbol}{price.priceString}
            </div>
          }
        </div>

        {!oneShop &&
          <div
            className="OnlineCheckoutSendItems-button OnlineCheckoutSendItems-button--toggle"
            onClick={this.toggleOpenState}
          >
            <Icon
              glyph={iconArrowDown}
              style={{ height: 7, width: 12 }}
            />
          </div>
        }

        {isOpen &&
          <Dropdown
            items={entries}
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
  selected: PropTypes.bool.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

OnlineCheckoutSendItems.propTypes = {
  entries: PropTypes.array.isRequired,
  inventory: PropTypes.object.isRequired,
  price: PropTypes.object,
  onInventorySelect: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

OnlineCheckoutSendItems.defaultProps = {
  entries: [],
};

export default OnlineCheckoutSendItems;
