
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import classnames from 'classnames';
import some from 'lodash/some';
import trim from 'lodash/trim';

import { ENTER, ESCAPE } from 'constants/KeyCodes';

import { on, off } from 'helpers/event';

import iconAdd from 'assets/images/icons/icon-mobile-add.svg';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

class AddCollectionDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    this.save = bind(this.save, this);
    this.handleKeyDown = bind(this.handleKeyDown, this);
  }

  focus() {
    this.refs.name.focus();
  }

  save() {
    const field = this.refs.name;
    const value = trim(field.value);

    if (!value) return undefined;

    if (this.props.onSave(value)) {
      field.value = '';
    } else {
      this.setState({ hasError: true });
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER) {
      event.preventDefault();
      this.save();
    } else if (event.keyCode === ESCAPE) {
      event.preventDefault();
      this.props.onCancel();
    } else if (this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const inputClasses = classnames(
      'Menu-addCollection-dropdown-input-field',
      { 'is-error': this.state.hasError }
    );

    return (
      <div className="Menu-addCollection-dropdown">
        <div className="Menu-addCollection-dropdown-container">
          <div className="Menu-addCollection-dropdown-item Menu-addCollection-dropdown-input">
            <input
              autoComplete="off"
              className={inputClasses}
              placeholder="Collection name"
              ref="name"
              type="text"
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="Menu-addCollection-dropdown-item">
            <Button onClick={this.save}>
              Save
            </Button>
          </div>
          <div className="Menu-addCollection-dropdown-item">
            <Button
              color="grey"
              outline
              onClick={this.props.onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const AddCollectionButton = ({ onClick }) => (
  <div className="Menu-link Menu-addCollection-link" onClick={onClick}>
    <Icon className="Menu-addCollection-link-icon" glyph={iconAdd} />
    Add collection
  </div>
);

class AddCollection extends Component {
  constructor(props) {
    super(props);

    this.save = bind(this.save, this);
    this.cancel = bind(this.cancel, this);
    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.handleAddButtonClick = bind(this.handleAddButtonClick, this);

    this.state = { isOpen: false };
  }
  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
  }
  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }
  save(name) {
    const { collections, onCreate } = this.props;

    const exists = some(collections, collection =>
      collection.name.toLowerCase() === name.toLowerCase());

    if (exists) return undefined;

    this.setState({ isOpen: false });
    onCreate({ name });

    return true;
  }
  cancel() {
    this.setState({ isOpen: false });
  }
  handleDocumentClick(event) {
    if (!this.state.isOpen) return undefined;

    if (!findDOMNode(this).contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }
  handleAddButtonClick() {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });

    if (!isOpen) {
      setTimeout(() => this.refs.dropdown.focus(), 0);
    }
  }
  render() {
    const { isOpen } = this.state;

    const addCollectionClasses = classnames(
      'Menu-item Menu-addCollection',
      { 'is-open': isOpen }
    );

    return (
      <span>
        <span className="Menu-item Menu-item--divider" />
        <div className={addCollectionClasses}>
          <AddCollectionButton onClick={this.handleAddButtonClick} />
          <AddCollectionDropdown
            ref="dropdown"
            onCancel={this.cancel}
            onSave={this.save}
          />
        </div>
      </span>
    );
  }
}

AddCollectionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

AddCollectionDropdown.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

AddCollection.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default AddCollection;
