
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';
import get from 'lodash/get';
import includes from 'lodash/includes';
import map from 'lodash/map';
import noop from 'lodash/noop';
import some from 'lodash/some';
import without from 'lodash/without';

import { ENTER } from 'constants/KeyCodes';

import iconClose from 'assets/images/icons/icon-close.svg';
import './styles.css';

import Checkbox from 'components/ui-elements/Checkbox';
import Icon from 'components/ui-elements/Icon';

const Collection = ({ id, checked, disabled, children, onChange }) => {
  const handleChange = value => onChange(id, value);

  return (
    <div className="CollectionsPopup-item">
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        label={children}
      />
    </div>
  );
};

const Collections = ({ collections, selectedIds, onChange }) => {
  const content = map(collections, ({ _cid, id, name }) =>
    <Collection
      checked={includes(selectedIds, id) || !id}
      id={id}
      key={_cid || id}
      onChange={onChange}
    >
      {name}
    </Collection>
  );

  return <div>{content}</div>;
};

class AddCollection extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
    this.handleKeyDown = bind(this.handleKeyDown, this);
  }

  clear() {
    this.refs.input.value = '';
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER) {
      const value = event.target.value.trim();

      if (this.props.onSubmit && value) {
        this.props.onSubmit(value);
      }

      event.preventDefault();
    }
  }

  render() {
    const inputClasses = classnames(
      'CollectionsPopup-input',
      { 'is-error': this.props.isError }
    );

    return (
      <div className="CollectionsPopup-item">
        <input
          autoComplete="off"
          className={inputClasses}
          placeholder="Add collection"
          ref="input"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

class Popup extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = bind(this.handleInputChange, this);
    this.handleInputSubmit = bind(this.handleInputSubmit, this);

    this.state = { isError: false };
  }

  handleInputChange() {
    if (this.state.isError) {
      this.setState({ isError: false });
    }
  }

  handleInputSubmit(name) {
    const {
      collections, cookbook, onCreate, onCollectionsUpdate,
    } = this.props;

    const exists = some(collections, collection =>
      collection.name.toLowerCase() === name.toLowerCase());

    if (exists) {
      this.setState({ isError: true });
    } else {
      const onSuccess = collection => {
        const collectionIds = get(cookbook, 'collectionIds', []);
        onCollectionsUpdate(collectionIds.concat(collection.id));
      };

      onCreate({ name }).subscribe(onSuccess, noop);
      this.refs.addForm.clear();
    }
  }

  render() {
    const {
      collections, className, cookbook, isAuthenticated, visible,
      onClose, onCollectionsUpdate, onDeselect,
      onMouseEnter, onMouseLeave, onSelect,
    } = this.props;
    const { isError } = this.state;

    if (!isAuthenticated) { return false; }

    const isSaved = get(cookbook, 'saved', false);
    const collectionIds = get(cookbook, 'collectionIds', []);

    const onChange = (id, value) => {
      if (value) {
        onCollectionsUpdate(collectionIds.concat(id));
      } else {
        onCollectionsUpdate(without(collectionIds, id));
      }
    };

    const popupClasses = classnames(
      'CollectionsPopup',
      {
        'is-open': visible,
        'is-hide': !visible,
      },
      className
    );

    return (
      <div
        className={popupClasses}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="CollectionsPopup-container">
          <div className="CollectionsPopup-container-inner">
            <div className="CollectionsPopup-title">
              Add to a collection
            </div>

            <Collection
              checked={isSaved}
              onChange={isSaved ? onDeselect : onSelect}
            >
              Saved in cookbook
            </Collection>

            <AddCollection
              isError={isError}
              ref="addForm"
              onChange={this.handleInputChange}
              onSubmit={this.handleInputSubmit}
            />

            <Collections
              collections={collections}
              selectedIds={collectionIds}
              onChange={onChange}
            />

            <div className="CollectionsPopup-close" onClick={onClose}>
              <Icon
                className="CollectionsPopup-close-icon"
                glyph={iconClose}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Collection.propTypes = {
  id: PropTypes.any,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Collections.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.shape({
    _cid: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.any,
  })).isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
};

AddCollection.propTypes = {
  isError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Popup.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.shape({
    _cid: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.any,
  })).isRequired,
  className: PropTypes.string,
  cookbook: PropTypes.shape({
    saved: PropTypes.bool,
    collectionIds: PropTypes.arrayOf(PropTypes.string),
  }),
  isAuthenticated: PropTypes.any,
  visible: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCollectionsUpdate: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
};

export default Popup;
