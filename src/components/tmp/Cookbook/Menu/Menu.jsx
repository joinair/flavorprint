
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import map from 'lodash/map';
import some from 'lodash/some';
import partial from 'lodash/partial';
import size from 'lodash/size';
import slice from 'lodash/slice';
import take from 'lodash/take';

import { ALL_RECIPES_COLLECTION } from 'constants/QueryParams';

import { getElWidth } from 'helpers/dom';
import { on, off } from 'helpers/event';

import './styles.css';

import AddCollection from './AddCollection';

const MORE_BUTTON_WIDTH = 80;

const Item = ({ active, count, name, onClick }) => {
  const linkClasses = classnames(
    'Menu-link',
    { 'is-active': active }
  );
  const linkCountClasses = classnames(
    'Menu-linkCount',
    { 'is-active': active }
  );

  return (
    <div className="Menu-item Menu-item--changeable">
      <a className={linkClasses} onClick={onClick}>
        <div className="Menu-name">
          {name}
        </div>
        <div className={linkCountClasses}>
          {count}
        </div>
      </a>
    </div>
  );
};

const collectionItem = (active, onSelect) => collection => (
  <Item
    active={active === collection.id}
    count={collection.numRecipes}
    key={collection.id || collection._cid}
    name={collection.name}
    onClick={partial(onSelect, collection.id)}
  />
);

class Menu extends Component {
  constructor(props) {
    super(props);

    this.calculateItems = bind(this.calculateItems, this);
    this.handleMoreButtonClick = bind(this.handleMoreButtonClick, this);
    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.handleItemClick = bind(this.handleItemClick, this);

    this.state = {
      horizontalItemsCount: null,
      isOpen: false,
      isWidthCalculated: false,
    };
  }
  componentDidMount() {
    this.calculateItems();
    on(window, 'resize', this.calculateItems);
    on(document, 'click', this.handleDocumentClick, true);
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.calculateItems();
    }
  }
  componentWillUnmount() {
    off(window, 'resize', this.calculateItems);
    off(document, 'click', this.handleDocumentClick, true);
  }
  calculateItems() {
    const { collections } = this.props;
    const { layout, fakeList } = this.refs;

    const layoutWidth = layout.offsetWidth;
    const fakeListWidth = fakeList.offsetWidth;

    if (layoutWidth === 0) return undefined;

    let horizontalItemsCount;
    if (layoutWidth > fakeListWidth + MORE_BUTTON_WIDTH) {
      horizontalItemsCount = size(collections);
    } else {
      // Add collection button is available only on our cookbook
      // if addCollection is null, fakeListChildren is list of collectionItems
      const hasAddCollection = !!findDOMNode(this.refs.addCollection);

      let addCollection;
      let listItems = fakeList.children;

      if (hasAddCollection) {
        addCollection = last(listItems);
        listItems = slice(listItems, 0, listItems.length - 1);
      }

      const addCollectionWidth = addCollection ? getElWidth(addCollection) : 0;
      const possibleWidth = layoutWidth - addCollectionWidth - MORE_BUTTON_WIDTH;

      for (let i = 0, itemsWidth = 0; i < listItems.length; i++) {
        itemsWidth += getElWidth(listItems[i]);

        if (itemsWidth >= possibleWidth) {
          horizontalItemsCount = i - 1;
          break;
        }
      }
    }

    if (this.state.horizontalItemsCount !== horizontalItemsCount) {
      this.setState({
        horizontalItemsCount,
        isWidthCalculated: true,
        isOpen: false,
      });
    } else if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }
  handleItemClick(id) {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }

    this.props.onCollectionSelect(id);
  }
  handleMoreButtonClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  handleDocumentClick(event) {
    if (!this.state.isOpen) return undefined;

    if (!findDOMNode(this).contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }
  render() {
    const {
      active, collections, isShared, totalCount,
      onCreate, onCollectionSelect,
    } = this.props;
    const {
      horizontalItemsCount, isOpen, isWidthCalculated,
    } = this.state;

    const allItems = map(
      collections,
      collectionItem(active, this.handleItemClick)
    );
    const horizontalItems = take(allItems, horizontalItemsCount);
    const popupItems = slice(allItems, horizontalItemsCount);

    const allRecipiesItem = (
      <Item
        active={active === ALL_RECIPES_COLLECTION}
        count={totalCount}
        name="All recipes"
        onClick={partial(onCollectionSelect, ALL_RECIPES_COLLECTION)}
      />
    );

    const isMoreButtonActive = some(
      slice(collections, horizontalItemsCount),
      collection => active === collection.id
    );
    const moreButton = !isEmpty(popupItems) && (
      <div className="Menu-item">
        <div
          className={classnames('Menu-link Menu-link--more', { 'is-active': isMoreButtonActive })}
          onClick={this.handleMoreButtonClick}
        >
          <span>{size(popupItems)} more</span>
        </div>
        <div className={classnames('CookbookCollectionsPopup', { 'is-open': isOpen })}>
          <div className="CookbookCollectionsPopup-container">
            <div className="Menu-list Menu-list--popup">
              {popupItems}
            </div>
          </div>
        </div>
      </div>
    );
    const addCollection = !isShared && (
      <AddCollection
        collections={collections}
        ref="addCollection"
        onCreate={onCreate}
      />
    );

    const menuClasses = classnames(
      'Menu',
      { 'is-width-calculated': isWidthCalculated }
    );

    return (
      <div className={menuClasses}>
        <div className="Menu-layout AppContainer" ref="layout">
          <div className="Menu-fakeList" ref="fakeList">
            {allRecipiesItem}
            {allItems}
            {addCollection}
          </div>
          <div className="Menu-list Menu-list--horizontal">
            {allRecipiesItem}
            {horizontalItems}
            {moreButton}
            {addCollection}
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  active: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Menu.propTypes = {
  active: PropTypes.string.isRequired,
  collections: PropTypes.arrayOf(PropTypes.shape({
    _cid: PropTypes.any,
    id: PropTypes.any,
    name: PropTypes.string.isRequired,
    numRecipes: PropTypes.number.isRequired,
  })).isRequired,
  isShared: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,

  onCollectionSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default Menu;
