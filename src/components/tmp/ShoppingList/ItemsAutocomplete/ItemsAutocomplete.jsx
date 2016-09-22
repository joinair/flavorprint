
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import find from 'lodash/find';
import isObject from 'lodash/isObject';
import noop from 'lodash/noop';
import orderBy from 'lodash/orderBy';
import take from 'lodash/take';

import {
  TAB,
  ENTER,
  ESCAPE,
  UP_ARROW,
  DOWN_ARROW,
} from 'constants/KeyCodes';

import { POPULAR_SHOPPING_LIST_ITEMS } from 'constants/LocalStorageKeys';

import iconAdd from 'assets/images/icons/icon-mobile-add.svg';

import Icon from 'components/ui-elements/Icon';

export const AUTOCOMPLETE_TYPES = {
  FREQUENTLY_USED: 'FREQUENTLY_USED',
  POPULAR_ITEMS: 'POPULAR_ITEMS',
};

const OPTIONS_LIMIT = 7;

const filterItems = (items, text) => {
  const textToMatch = text.trim();

  if (!textToMatch) { return take(items, OPTIONS_LIMIT); }
  if (textToMatch.length >= 30) { return []; }

  const Fuse = require('fuse.js');
  const fuse = new Fuse(items, { keys: ['text'], threshold: 0.2 });
  const results = fuse.search(textToMatch);

  return take(results, OPTIONS_LIMIT);
};

const keyHandlers = {
  [TAB]() { this.close(); },

  [ENTER]() {
    const { options, selectedIndex, text } = this.props;

    if (!text) { return; }

    if (selectedIndex === null) {
      this.handleSelect(text);
    } else {
      this.handleSelect(options[selectedIndex]);
    }
  },

  [ESCAPE]() {
    this.close();
    this.refs.input.blur();
  },

  [UP_ARROW]() {
    const { options, selectedIndex, text } = this.props;

    let nextIndex = selectedIndex === null
      ? options.length - 1
      : selectedIndex - 1;

    if (nextIndex === -1) {
      nextIndex = null;
    }

    this.refs.input.value = nextIndex === null
      ? text
      : options[nextIndex].text;

    this.props.onUpdate({ selectedIndex: nextIndex });
  },

  [DOWN_ARROW]() {
    const { options, selectedIndex, text } = this.props;

    let nextIndex = selectedIndex === null
      ? 0
      : selectedIndex + 1;

    if (nextIndex === options.length) {
      nextIndex = null;
    }

    this.refs.input.value = nextIndex === null
      ? text
      : options[nextIndex].text;

    this.props.onUpdate({ selectedIndex: nextIndex });
  },
};

class ItemsAutocomplete extends Component {
  constructor(props) {
    super(props);

    let cache;

    if (global.Platform.OS === 'browser') {
      const storage = require('helpers/storage').default;
      const cacheString = storage.get(POPULAR_SHOPPING_LIST_ITEMS);
      if (cacheString) { cache = JSON.parse(cacheString || null); }
    }

    this.state = { loadPopularItems: !cache, items: cache || [] };

    this.handleAddClick = bind(this.handleAddClick, this);
    this.handleChange = bind(this.handleChange, this);
    this.handleKeyDown = bind(this.handleKeyDown, this);
  }

  componentDidMount() {
    const storage = require('helpers/storage').default;
    const { loadPopularItems } = this.state;
    if (!loadPopularItems) { return; }

    const onSuccess = data => {
      const items =
        orderBy(data.products, item => item.popularity | 0, 'desc');

      this.setState({ items });
      storage.set(
        POPULAR_SHOPPING_LIST_ITEMS,
        JSON.stringify(items)
      );
    };

    this.props
      .loadPopularItems()
      .subscribe(onSuccess, noop);
  }

  close() {
    if (this.props.open) {
      this.refs.input.value = '';
      this.refs.input.blur();
      this.props.onUpdate({
        open: false,
        options: [],
        selectedIndex: null,
        text: '',
        type: null,
      });
    }
  }

  handleAddClick() {
    const value = this.refs.input.value.trim();
    this.refs.input.focus();

    if (value) { this.handleSelect(value); }
  }

  handleChange() {
    const value = this.refs.input.value;

    if (value.trim()) {
      this.props.onUpdate({
        open: true,
        options: filterItems(this.state.items, value),
        selectedIndex: null,
        text: value.trim(),
        type: AUTOCOMPLETE_TYPES.POPULAR_ITEMS,
      });
    } else {
      this.props.onUpdate({
        open: true,
        options: [],
        selectedIndex: null,
        text: '',
        type: AUTOCOMPLETE_TYPES.FREQUENTLY_USED,
      });
    }
  }

  handleKeyDown(event) {
    const { keyCode } = event;

    if (keyHandlers[keyCode]) {
      keyHandlers[keyCode].call(this, event);
    }
  }

  handleSelect(item) {
    const { onSelect } = this.props;
    const { items } = this.state;

    this.refs.input.value = '';

    this.props.onUpdate({
      open: true,
      options: [],
      selectedIndex: null,
      text: '',
      type: AUTOCOMPLETE_TYPES.FREQUENTLY_USED,
    });

    if (isObject(item)) {
      onSelect({ text: item.text }, 'Autocomplete', {
        categoryAnalysisContainer: item.categoryAnalysisContainer,
      });

      return;
    }

    const popularItem = find(items, { text: item.toLowerCase().trim() });

    if (popularItem) {
      onSelect({ text: item.trim() }, 'Autocomplete', {
        categoryAnalysisContainer: popularItem.categoryAnalysisContainer,
      });
    } else {
      onSelect({ text: item.trim() }, 'Manual');
    }
  }

  render() {
    return (
      <div className="ItemsAutocomplete">
        <input
          className="ItemsAutocomplete-field"
          autoComplete="off"
          placeholder="Add to list"
          ref="input"
          type="text"
          onChange={this.handleChange}
          onFocus={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />

        <div className="ItemsAutocomplete-icon" onClick={this.handleAddClick}>
          <Icon className="ItemsAutocomplete-button" glyph={iconAdd} />
        </div>
      </div>
    );
  }
}

ItemsAutocomplete.propTypes = {
  loadPopularItems: PropTypes.func.isRequired,

  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedIndex: PropTypes.number,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    null,
    AUTOCOMPLETE_TYPES.FREQUENTLY_USED,
    AUTOCOMPLETE_TYPES.POPULAR_ITEMS,
  ]),

  onSelect: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ItemsAutocomplete;
