
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';
import get from 'lodash/get';
import find from 'lodash/find';
import some from 'lodash/some';

import {
  ALL_RECIPES_COLLECTION,
  VIEW_FROM_COOKBOOK,
} from 'constants/QueryParams';

import { ENTER, ESCAPE } from 'constants/KeyCodes';

import iconPen from 'assets/images/icons/icon-pen.svg';
import iconTrashBin from 'assets/images/icons/icon-trashbin.svg';
import './styles.css';

import AddRecipeButton from 'components/blocks/AddRecipeButton';
import Icon from 'components/ui-elements/Icon';
import Button from 'components/ui-elements/Button';

const collectionName = (collectionId, collection) => {
  switch (collectionId) {
    case ALL_RECIPES_COLLECTION: return 'All recipes';
    default: return collection.name;
  }
};

class EditHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    this.handleSave = bind(this.handleSave, this);
    this.handleKeyDown = bind(this.handleKeyDown, this);
  }

  handleSave() {
    const value = this.refs.input.value.trim();

    if (!value) return;

    if (!this.props.onSave(value)) {
      this.setState({ hasError: true });
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === ENTER) {
      event.preventDefault();
      this.handleSave();
    } else if (event.keyCode === ESCAPE) {
      event.preventDefault();
      this.props.onClose();
    } else if (this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { name, onClose, onDestroy } = this.props;
    const { hasError } = this.state;

    return (
      <div className="CollectionHeaderDesktop-form">
        <div className="CollectionHeaderDesktop-form-container">
          <div className="CollectionHeaderDesktop-form-input">
            <input
              className={classnames(
                'CollectionHeaderDesktop-form-input-field',
                { 'is-error': hasError }
              )}
              ref="input"
              type="text"
              defaultValue={name}
              autoFocus
              onKeyDown={this.handleKeyDown}
            />
          </div>

          <div className="CollectionHeaderDesktop-form-item">
            <Button onClick={this.handleSave}>
              Save
            </Button>
          </div>

          <div className="CollectionHeaderDesktop-form-item">
            <Button
              color="grey"
              outline
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>

          <div
            className="
              CollectionHeaderDesktop-form-item
              CollectionHeaderDesktop-form-item--removeControl"
          >
            <Button color="transparent" onClick={onDestroy}>
              <Icon
                className="CollectionHeaderDesktop-form-removeIcon"
                glyph={iconTrashBin}
              />
              Remove collection
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const BaseHeader = ({ editable, name, onEdit }) => {
  const editButton = editable &&
    <span className="CollectionHeaderDesktop-title-link" onClick={onEdit}>
      <Icon className="CollectionHeaderDesktop-title-link-icon" glyph={iconPen} />
      Edit
    </span>;

  return (
    <div className="CollectionHeaderDesktop-title">
      <h1 className="CollectionHeaderDesktop-title-text">{name}</h1>
      {editButton}
    </div>
  );
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };

    this.handleDestroy = bind(this.handleDestroy, this);
    this.handleSave = bind(this.handleSave, this);
    this.handleToggleEdit = bind(this.handleToggleEdit, this);
  }

  componentWillReceiveProps(props) {
    if (get(props, 'collection.id') !==
        get(this.props, 'collection.id')) {
      this.setState({ edit: false });
    }
  }

  handleDestroy() {
    this.props.onDestroy(this.props.collectionId);
  }

  handleSave(name) {
    const { collectionId, collections, onSave } = this.props;

    const exists = some(collections, collection =>
      collection.name.toLowerCase() === name.toLowerCase() &&
      collection.id !== collectionId
    );

    if (exists) return undefined;

    onSave({ name, id: collectionId });
    this.handleToggleEdit();

    return true;
  }

  handleToggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const {
      collectionId, collections,
      isHidden, isShared,
      totalRecipeCount,
      user,
      onCollectionSelect,
    } = this.props;

    const collection = find(collections, { id: collectionId });

    const mobileHeader = (
      <div className="CollectionHeaderMobile">
        <div className="CollectionHeaderMobile-container">
          <div className="CollectionHeaderMobile-recipeSelect" onClick={onCollectionSelect}>
            <span className="CollectionHeaderMobile-recipeSelect-title">
              {get(collection, 'name', 'All recipes')}
            </span>
            <span className="CollectionHeaderMobile-recipeSelect-count">
              {get(collection, 'numRecipes', totalRecipeCount)}
            </span>
          </div>

          {
            !isShared && (
              <AddRecipeButton
                className="CollectionHeaderMobile-addRecipeBtn"
                viewSource={VIEW_FROM_COOKBOOK}
                rightAligned
                bottomAligned
              />
            )
          }
        </div>
      </div>
    );

    if (isHidden) { return mobileHeader; }

    const name = collectionName(collectionId, collection);

    const header = this.state.edit
      ? (
        <EditHeader
          name={name}
          onClose={this.handleToggleEdit}
          onDestroy={this.handleDestroy}
          onSave={this.handleSave}
        />
      ) : (
        <BaseHeader
          collectionId={collectionId}
          editable={!!collection && !isShared}
          name={name}
          user={user}
          onEdit={this.handleToggleEdit}
        />
      );

    return (
      <div>
        {mobileHeader}
        <div className="CollectionHeaderDesktop AppContent AppContainer">
          {header}
          {
            !isShared && (
              <div className="CollectionHeaderDesktop-control">
                <AddRecipeButton
                  rightAligned
                  viewSource={VIEW_FROM_COOKBOOK}
                />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

EditHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

BaseHeader.propTypes = {
  collectionId: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Header.propTypes = {
  collectionId: PropTypes.any.isRequired,
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isHidden: PropTypes.bool.isRequired,
  isShared: PropTypes.bool.isRequired,
  totalRecipeCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,

  onCollectionSelect: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Header;
