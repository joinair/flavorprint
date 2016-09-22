
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import classnames from 'classnames';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import find from 'lodash/find';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import some from 'lodash/some';
import take from 'lodash/take';

import { ENTER, ESCAPE, TAB, UP_ARROW, DOWN_ARROW } from 'constants/KeyCodes';

import { on, off } from 'helpers/event';

import iconSearch from 'assets/images/icons/icon-search.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';
import AvoidancesPopup from './AvoidancesPopup';

const isItemFiltered = (item, filter) =>
  some(filter, (value, key) =>
    isArray(value)
      ? some(value, val => includes(item[key], val.canonicalName))
      : includes(item[key], get(value, 'canonicalName'))
  );

const isItemSelected = (item, selectedItems) =>
  some(selectedItems, { canonicalName: item.canonicalName });

const prepareItems = (items, selectedItems, filter) =>
  orderBy(
    map(items, item => ({
      id: item.canonicalName,
      text: item.text,
      disliked: isItemSelected(item, selectedItems) || isItemFiltered(item, filter),
    })),
    ['disliked'],
    ['asc']
  );

const getInitialState = props => ({
  fetchedItems: props.defaultItems,
  isOpen: false,
  term: '',
});

const keyDownHandlers = {
  [ENTER]() {
    const popupItem = this.refs.popup.getFirstAvailableItem();

    if (popupItem) {
      const item = find(this.state.fetchedItems, { canonicalName: popupItem.id });

      this.props.onSelect(item);
      this.refs.input.blur();
      this.setState(getInitialState(this.props));
    }
  },

  [ESCAPE]() {
    this.setState(getInitialState(this.props));
    this.refs.input.blur();
  },

  [TAB]() {
    this.setState({ isOpen: false });
  },

  [UP_ARROW]() {
    this.refs.popup.selectPrevious();
  },

  [DOWN_ARROW]() {
    this.refs.popup.selectNext();
  },
};

class AvoidancesAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.handleItemSelect = bind(this.handleItemSelect, this);
    this.handleFieldChange = bind(this.handleFieldChange, this);
    this.handleFieldFocus = bind(this.handleFieldFocus, this);
    this.handleFieldKeyDown = bind(this.handleFieldKeyDown, this);
    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.preparePopupGroups = bind(this.preparePopupGroups, this);

    this.state = getInitialState(props);
  }

  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }

  preparePopupGroups() {
    const { maxCount, selectedItems, allergies, diet } = this.props;
    const { fetchedItems } = this.state;

    const groups = groupBy(
      take(
        prepareItems(fetchedItems, selectedItems, { allergies, diets: diet }),
        maxCount
      ),
      'disliked'
    );

    return [
      {
        text: '',
        items: groups.false || [],
      },
      {
        text: 'Avoided ingredients',
        items: groups.true || [],
      },
    ];
  }

  handleItemSelect(value) {
    const item = find(this.state.fetchedItems, { canonicalName: value });

    this.setState(getInitialState(this.props));
    this.props.onSelect(item);
  }

  handleFieldChange(event) {
    const { value } = event.target;
    const { defaultItems, products } = this.props;

    if (value.trim()) {
      const Fuse = require('fuse.js');
      const fuse = new Fuse(products, { keys: ['text'], threshold: 0.2 });
      const results = fuse.search(value);

      this.setState({
        fetchedItems: results,
        term: value,
      });
    } else {
      this.setState({
        fetchedItems: defaultItems,
        isOpen: !!defaultItems.length,
        term: value,
      });
    }
  }

  handleFieldFocus() {
    this.setState({ isOpen: true });
  }

  handleFieldKeyDown(event) {
    const { keyCode } = event;
    const handler = keyDownHandlers[keyCode];
    if (handler) {
      handler.call(this, event);
      event.preventDefault();
    }
  }

  handleDocumentClick(event) {
    if (!this.state.isOpen) return undefined;

    if (!findDOMNode(this).contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { context, placeholder } = this.props;
    const { isOpen, term } = this.state;

    const autocompleteClasses = classnames(
      'AvoidancesAutocomplete',
      {
        'is-open': isOpen,
        [`is-in${context}`]: context,
      }
    );

    return (
      <div className={autocompleteClasses}>
        <div className="AvoidancesAutocomplete-fieldContainer">
          <div className="AvoidancesAutocomplete-iconContainer">
            <Icon
              className="AvoidancesAutocomplete-icon"
              glyph={iconSearch}
            />
          </div>
          <input
            autoComplete="off"
            className="AvoidancesAutocomplete-field"
            placeholder={placeholder}
            ref="input"
            value={term}
            onChange={this.handleFieldChange}
            onFocus={this.handleFieldFocus}
            onKeyDown={this.handleFieldKeyDown}
          />
        </div>

        {isOpen &&
          <AvoidancesPopup
            groups={this.preparePopupGroups()}
            ref="popup"
            term={term}
            onSelect={this.handleItemSelect}
          />
        }
      </div>
    );
  }
}

AvoidancesAutocomplete.propTypes = {
  allergies: PropTypes.array,
  context: PropTypes.string,
  defaultItems: PropTypes.array,
  diet: PropTypes.object,
  maxCount: PropTypes.number,
  placeholder: PropTypes.string,

  products: PropTypes.arrayOf(
    PropTypes.shape({
      allergies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      canonicalName: PropTypes.string.isRequired,
      diets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  selectedItems: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

AvoidancesAutocomplete.defaultProps = {
  allergies: [],
  defaultItems: [],
  diet: null,
  maxCount: 5,
  placeholder: 'Add ingredient to avoid',
  selectedItems: [],
};

export default AvoidancesAutocomplete;
