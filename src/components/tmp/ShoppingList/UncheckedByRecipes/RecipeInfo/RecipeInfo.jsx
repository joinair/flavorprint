
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import classnames from 'classnames';
import get from 'lodash/get';
import partial from 'lodash/partial';

import { VIEW_SOURCE, VIEW_FROM_SHOPPING_LIST } from 'constants/QueryParams';

import { on, off } from 'helpers/event';

import iconArrowDown from 'assets/images/icons/icon-arrow-down.svg';
import iconView from 'assets/images/icons/icon-view.svg';
import iconHeart from 'assets/images/icons/icon-heart.svg';
import iconRemove from 'assets/images/icons/icon-close.svg';
import Icon from 'components/ui-elements/Icon';

const Actions = ({ saved, url, onDeselect, onRemove, onSelect }) => {
  const selectAction = saved
    ? (
      <div className="ShoppingList-itemEdit-link" onClick={onDeselect}>
        <Icon
          className="
            ShoppingList-itemEdit-link-icon
            ShoppingList-itemEdit-link-icon--save
            is-saved"
          glyph={iconHeart}
        />
        Saved
      </div>
    ) : (
      <div className="ShoppingList-itemEdit-link" onClick={onSelect}>
        <Icon
          className="ShoppingList-itemEdit-link-icon ShoppingList-itemEdit-link-icon--save"
          glyph={iconHeart}
        />
        Save
      </div>
    );

  return (
    <div className="ShoppingList-item-content ShoppingList-itemEdit">
      <a href={url} target="_blank" className="ShoppingList-itemEdit-link">
        <Icon
          className="ShoppingList-itemEdit-link-icon ShoppingList-itemEdit-link-icon--view"
          glyph={iconView}
        />
        View
      </a>
      {selectAction}
      <div className="ShoppingList-itemEdit-link" onClick={onRemove}>
        <Icon
          className="ShoppingList-itemEdit-link-icon ShoppingList-itemEdit-link-icon--remove"
          glyph={iconRemove}
        />
        Remove
      </div>
    </div>
  );
};

class RecipeInfo extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = bind(this.handleDocumentClick, this);

    this.state = { opened: false };
  }
  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
  }
  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }
  handleDocumentClick(event) {
    if (findDOMNode(this.refs.header).contains(event.target)) {
      this.setState({ opened: !this.state.opened });
    } else if (
      this.state.opened &&
      findDOMNode(this).contains(event.target)
    ) {
      return;
    } else {
      if (this.state.opened) { this.setState({ opened: false }); }
    }
  }
  render() {
    const { opened } = this.state;
    const {
      recipe,
      onDeselect, onRemove, onSelect,
    } = this.props;
    const { cookbook, data, externalUrl, id } = recipe;
    const { name } = data;

    const headerClass = classnames(
      'ShoppingList-item',
      { 'is-active': opened }
    );

    const headingClass = 'ShoppingList-item-content' +
      ' ShoppingList-item-heading' +
      ' ShoppingList-item-heading--editable';

    const recipeId = externalUrl || id;

    const viewSource = `${VIEW_SOURCE}=${VIEW_FROM_SHOPPING_LIST}`;

    const recipeUrl = externalUrl
      ? `/recipes/from-partners?url=${encodeURIComponent(externalUrl)}&${viewSource}`
      : `/recipes/${id}?${viewSource}`;

    const actions = opened && (
      <Actions
        saved={get(cookbook, 'saved')}
        url={recipeUrl}
        onDeselect={partial(onDeselect, recipe)}
        onRemove={partial(onRemove, recipeId)}
        onSelect={partial(onSelect, recipe)}
      />
    );

    return (
      <div className={headerClass}>
        <div className={headingClass} ref="header">
          <div className="ShoppingList-item-heading-title">
            {name}
          </div>

          <Icon
            className="ShoppingList-item-heading-titleIcon"
            glyph={iconArrowDown}
          />
        </div>

        {actions}
      </div>
    );
  }
}

Actions.propTypes = {
  saved: PropTypes.bool,
  url: PropTypes.string.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

RecipeInfo.propTypes = {
  recipe: PropTypes.shape({
    cookbook: PropTypes.shape({
      saved: PropTypes.bool.isRequired,
    }),

    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  onDeselect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default RecipeInfo;
