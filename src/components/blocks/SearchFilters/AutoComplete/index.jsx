
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import take from 'lodash/take';
import map from 'lodash/map';
import bind from 'lodash/bind';
import capitalize from 'lodash/capitalize';
import classnames from 'classnames';

import { on, off } from 'helpers/event';

import Input from 'components/ui-elements/Input';

import iconMobileAdd from 'assets/images/icons/icon-mobile-add.svg';

import {
  UP_ARROW,
  DOWN_ARROW,
  ESCAPE,
} from 'constants/KeyCodes';

const keyDownHandlers = {
  [UP_ARROW]() {
    const { selectedIndex, completions, value } = this.state;
    const newIndex = Math.max(0, selectedIndex - 1);
    const { text } = completions[newIndex] || value;
    this.setState({ selectedIndex: newIndex, value: text });
  },

  [DOWN_ARROW]() {
    const { completions, selectedIndex, value } = this.state;
    const length = completions ? completions.length : 0;
    const { limit } = this.props;
    const newIndex = Math.min(limit - 1, length - 1, selectedIndex + 1);
    const { text } = completions[newIndex] || value;
    this.setState({ selectedIndex: newIndex, value: text });
  },

  [ESCAPE]() {
    this.setState({ isOpen: false, completions: [], selectedIndex: 0 });
  },
};

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', isOpen: false, completion: [], selectedIndex: 0 };
    this.onChange = bind(this.onChange, this);
    this.onSubmit = bind(this.onSubmit, this);
    this.onKeyDown = bind(this.onKeyDown, this);
    this.onClick = bind(this.onClick, this);
    this.onDocumentClick = bind(this.onDocumentClick, this);
  }

  componentDidMount() {
    on(document, 'click', this.onDocumentClick, true);
  }

  componentWillUnmount() {
    off(document, 'click', this.onDocumentClick, true);
  }

  onDocumentClick(event) {
    if (!this.isOpen()) return undefined;

    if (!findDOMNode(this).contains(event.target)) {
      this.setState({ isOpen: false, completions: [] });
    }
  }

  onClick() {
    this.onSubmit();
  }

  onChange(value) {
    const completions = this.matchProducts(value);
    this.setState({ completions, value, isOpen: true, selectedIndex: 0 });
  }

  onSubmit() {
    const option = this.getSelectedOption();
    if (option) {
      this.submit(option);
    }
    this.refs.input.focus();
  }

  onKeyDown(event) {
    const { keyCode } = event;
    const handler = keyDownHandlers[keyCode];
    if (handler) {
      handler.call(this, event);
      event.preventDefault();
    }
  }

  getSelectedOption() {
    const { completions } = this.state;
    return completions && completions[this.state.selectedIndex];
  }

  isEmpty() {
    const { completions, isOpen } = this.state;
    return isOpen && (!completions || completions.length === 0);
  }

  isOpen() {
    const { value, isOpen } = this.state;
    return isOpen && value && value.length > 0;
  }

  submit(option) {
    this.setState({ value: '', completions: [], selectedIndex: 0 });
    this.props.onSubmit(option);
  }

  submitter(value) {
    return (e) => {
      this.submit(value);
      e.preventDefault();
    };
  }

  matchProducts(value) {
    const { products } = this.props;
    const Fuse = require('fuse.js');
    const fuse = new Fuse(products, { keys: ['text'], threshold: 0.2 });
    return fuse.search(value);
  }

  renderOptions() {
    const { limit } = this.props;
    const { completions, selectedIndex } = this.state;

    const limited = take(completions, limit);

    return map(limited, (option, index) => {
      const { text, canonicalName } = option;

      return (
        <li
          key={canonicalName}
          className={
            classnames({
              'SearchFilters-autoComplete-options-option': true,
              'SearchFilters-autoComplete-options-option--selected':
                index === selectedIndex,
            })
          }
          onClick={this.submitter(option)}
        >
          <a href="#">
            {capitalize(text)}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="SearchFilters-autoComplete">
        <Input
          value={this.state.value}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onKeyDown={this.onKeyDown}
          onIconClick={this.onClick}
          icon={iconMobileAdd}
          iconStyle={{ width: 19, height: 19 }}
          placeholder="Find an ingredient"
          ref="input"
        />
        {this.isOpen() &&
          <ul className="SearchFilters-autoComplete-options">
            {this.isEmpty() &&
              <li
                className={classnames({
                  'SearchFilters-autoComplete-options-option': true,
                  'SearchFilters-autoComplete-options-option--empty': true,
                })}
              >
                Ingredient not found
              </li>}
            {this.renderOptions()}
          </ul>}
      </div>
    );
  }
}

AutoComplete.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  limit: PropTypes.number,
  products: PropTypes.array,
};

AutoComplete.defaultProps = {
  limit: 5,
  products: [],
};

export default AutoComplete;
