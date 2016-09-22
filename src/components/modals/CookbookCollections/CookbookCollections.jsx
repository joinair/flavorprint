
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import classnames from 'classnames';
import map from 'lodash/map';
import partial from 'lodash/partial';
import some from 'lodash/some';

import { on, off } from 'helpers/event';

import { ENTER, ESCAPE } from 'constants/KeyCodes';
import { ALL_RECIPES_COLLECTION } from 'constants/QueryParams';

import iconAdd from 'assets/images/icons/icon-mobile-add.svg';
import iconPen from 'assets/images/icons/icon-pen.svg';
import iconTrashbin from 'assets/images/icons/icon-trashbin.svg';
import './styles.css';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import ModalHeader from 'components/tmp/Modal/ModalHeader';

const AllRecipes = ({ numRecipes, isActive, isShared, onEdit, onSelect }) =>
  <div
    className={
      classnames('CookbookCollectionsModal-item', { 'is-active': isActive })
    }
  >
    <div className="CookbookCollectionsModal-item-container">
      <div
        className="CookbookCollectionsModal-item-name"
        onClick={partial(onSelect, ALL_RECIPES_COLLECTION)}
      >
        <span>All recipes</span>
        <span className="CookbookCollectionsModal-item-nameCount">
          {numRecipes}
        </span>
      </div>

      {
        !isShared && (
          <a
            className="CookbookCollectionsModal-item-addCollection"
            onClick={partial(onEdit, ALL_RECIPES_COLLECTION)}
          >
            <Icon
              className="CookbookCollectionsModal-item-addCollection-icon"
              glyph={iconAdd}
            />
            Add collection
          </a>
        )
      }
    </div>
  </div>;

const Collection = ({ collection, isActive, isShared, onEdit, onSelect }) =>
  <div
    className={
      classnames('CookbookCollectionsModal-item', { 'is-active': isActive })
    }
  >
    <div className="CookbookCollectionsModal-item-container">
      <div
        className="CookbookCollectionsModal-item-name"
        onClick={partial(onSelect, collection.id)}
      >
        <span>{collection.name}</span>
        <span className="CookbookCollectionsModal-item-nameCount">
          {collection.numRecipes}
        </span>
      </div>

      {
        !isShared && (
          <a
            className="CookbookCollectionsModal-item-editCollection"
            onClick={partial(onEdit, collection.id)}
          >
            <Icon
              className="CookbookCollectionsModal-item-editCollection-icon"
              glyph={iconPen}
            />
          </a>
        )
      }
    </div>
  </div>;

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    this.handleKeyDown = bind(this.handleKeyDown, this);
    this.save = bind(this.save, this);
  }

  save() {
    const value = this.refs.input.value.trim();

    if (!value) return undefined;

    if (this.props.onSave(value)) {
      this.props.onClose();
    } else {
      this.setState({ hasError: true });
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER) {
      event.preventDefault();
      this.save();
    } else if (event.keyCode === ESCAPE) {
      this.props.onClose();
    } else if (this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { defaultValue, onClose, onDestroy } = this.props;
    const formClass = 'CookbookCollectionsModal-item-container' +
      ' CookbookCollectionsModal-item-form';

    return (
      <div className="CookbookCollectionsModal-item">
        <div className={formClass}>
          <input
            autoComplete="off"
            autoFocus
            className={
              classnames(
                'CookbookCollectionsModal-item-formInput',
                { 'is-error': this.state.hasError })
            }
            defaultValue={defaultValue}
            placeholder="Collection name"
            ref="input"
            type="text"
            onKeyDown={this.handleKeyDown}
          />
          <div className="CookbookCollectionsModal-item-formActions">
            <Button
              className="CookbookCollectionsModal-item-btnSave"
              onClick={this.save}
            >
              Save
            </Button>

            <Button
              color="grey"
              outline
              onClick={onClose}
            >
              Cancel
            </Button>

            <div className="CookbookCollectionsModal-item-divider" />
            {onDestroy &&
              <div
                className="CookbookCollectionsModal-item-btnRemove"
                onClick={onDestroy}
              >
                <Icon
                  className="CookbookCollectionsModal-item-btnRemove-icon"
                  glyph={iconTrashbin}
                />
                Remove
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

class CookbookCollections extends Component {
  constructor(props) {
    super(props);
    this.state = { editId: null };
    this.handleKeyDown = bind(this.handleKeyDown, this);
    this.handleSave = bind(this.handleSave, this);
  }

  componentDidMount() {
    on(document, 'keydown', this.handleKeyDown, true);
  }

  componentWillUnmount() {
    off(document, 'keydown', this.handleKeyDown, true);
  }

  handleKeyDown(event) {
    if (event.keyCode === ESCAPE &&
       !findDOMNode(this).contains(event.target)) {
      event.preventDefault();
      this.props.onClose();
    }
  }

  handleSave(name) {
    const { collections, onSave } = this.props;
    const { editId } = this.state;

    const exists = some(collections.entries, collection =>
      collection.name.toLowerCase() === name.toLowerCase() &&
      collection.id !== editId
    );

    if (exists) return undefined;

    onSave({
      name,
      id: editId === ALL_RECIPES_COLLECTION ? undefined : editId,
    });

    return true;
  }

  render() {
    const {
      activeCollectionId, collections, firstName, isShared,
      onClose, onDestroy, onSelect,
    } = this.props;

    const { editId } = this.state;

    const onEdit = id => this.setState({ editId: id });
    const onEditClose = partial(onEdit, null);

    const title = `${firstName}'s cookbook`;

    const newCollectionForm = editId === ALL_RECIPES_COLLECTION && (
      <EditForm
        onClose={onEditClose}
        onSave={this.handleSave}
      />
    );

    const collectionsEls = map(collections.entries, collection =>
      editId === collection.id
        ? (
          <EditForm
            defaultValue={collection.name}
            key={collection._cid || collection.id}
            onClose={onEditClose}
            onDestroy={
              partial(
                onDestroy,
                collection.id,
                activeCollectionId === collection.id
              )
            }
            onSave={this.handleSave}
          />
        ) : (
          <Collection
            collection={collection}
            isActive={activeCollectionId === collection.id}
            isShared={isShared}
            key={collection._cid || collection.id}
            onEdit={onEdit}
            onSelect={onSelect}
          />
        )
    );

    return (
      <div className="CookbookCollectionsModal">
        <ModalHeader title={title} onHide={onClose} />

        <div className="CookbookCollectionsModal-list">
          <AllRecipes
            isActive={activeCollectionId === ALL_RECIPES_COLLECTION}
            isShared={isShared}
            numRecipes={collections.numRecipes}
            onEdit={onEdit}
            onSelect={onSelect}
          />

          {newCollectionForm}

          {collectionsEls}
        </div>
      </div>
    );
  }
}

AllRecipes.propTypes = {
  numRecipes: PropTypes.number,
  isActive: PropTypes.bool,
  isShared: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Collection.propTypes = {
  collection: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  isShared: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

EditForm.propTypes = {
  defaultValue: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDestroy: PropTypes.func,
};

CookbookCollections.propTypes = {
  activeCollectionId: PropTypes.string.isRequired,

  collections: PropTypes.shape({
    numRecipes: PropTypes.number.isRequired,
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        _cid: PropTypes.any,
        id: PropTypes.any,
        name: PropTypes.string.isRequired,
        numRecipes: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,

  firstName: PropTypes.string.isRequired,
  isShared: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CookbookCollections;
