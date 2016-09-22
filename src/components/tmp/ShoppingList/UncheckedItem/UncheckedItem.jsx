
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import get from 'lodash/get';
import partial from 'lodash/partial';

import { on, off } from 'helpers/event';

import { ENTER, ESCAPE } from 'constants/KeyCodes';

import iconPen from 'assets/images/icons/icon-pen.svg';
import iconRemove from 'assets/images/icons/icon-close.svg';
import Icon from 'components/ui-elements/Icon';
import Checkbox from 'components/ui-elements/Checkbox';

const CLOSED = 'CLOSED';
const OPEN = 'OPEN';
const EDITING = 'EDITING';

const handleBlur = (defaultValue, onEdit, key, event) => {
  const value = event.target.value.trim();

  if (value && value !== defaultValue) {
    onEdit(key, value);
  }
};

const handleKeyDown = event => {
  if (event.keyCode === ENTER) {
    event.preventDefault();
    if (event.target.value.trim()) {
      event.target.blur();
    }
  } else if (event.keyCode === ESCAPE) {
    event.preventDefault();
    event.target.blur();
  }
};

class UncheckedItem extends Component {
  constructor(props) {
    super(props);
    this.state = { status: CLOSED };

    this.handleDocumentClick = bind(this.handleDocumentClick, this);
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }

  handleDocumentClick(event) {
    if (!findDOMNode(this).contains(event.target) &&
        this.state.status !== CLOSED) {
      this.setState({ status: CLOSED });
      off(document, 'click', this.handleDocumentClick, true);
    }
  }

  render() {
    const {
      item: { key }, recipes,
      onCheck, onEdit, onRemove,
    } = this.props;

    const { recipe, text } = key;
    const { status } = this.state;

    let content;
    let actions;

    if (status === EDITING) {
      const onBlur = event => {
        handleBlur(text, onEdit, key, event);
        this.setState({ status: CLOSED });
        off(document, 'click', this.handleDocumentClick, true);
      };

      content = (
        <div className="ShoppingList-item-text">
          <div className="ShoppingList-item-name">
            <input
              autoComplete="off"
              autoFocus
              className="ShoppingList-item-name-input"
              defaultValue={text}
              onBlur={onBlur}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      );
    } else {
      const recipeName = recipes && recipe && get(recipes[recipe], 'data.name');
      const recipeInfo = recipeName && (
        <div className="ShoppingList-item-subName">{recipeName}</div>
      );

      const onClick = () => {
        if (status === OPEN) {
          this.setState({ status: CLOSED });
          off(document, 'click', this.handleDocumentClick, true);
        } else {
          this.setState({ status: OPEN });
          on(document, 'click', this.handleDocumentClick, true);
        }
      };

      const edit = () => {
        this.setState({ status: EDITING });
        on(document, 'click', this.handleDocumentClick, true);
      };

      actions = status === OPEN && (
        <div className="ShoppingList-item-content ShoppingList-itemEdit">
          <a className="ShoppingList-itemEdit-link" onClick={edit}>
            <Icon
              className="ShoppingList-itemEdit-link-icon ShoppingList-itemEdit-link-icon--edit"
              glyph={iconPen}
            />
            Edit
          </a>
          <a className="ShoppingList-itemEdit-link" onClick={partial(onRemove, key)}>
            <Icon
              className="ShoppingList-itemEdit-link-icon ShoppingList-itemEdit-link-icon--remove"
              glyph={iconRemove}
            />
            Remove
          </a>
        </div>
      );

      content = (
        <div
          className="ShoppingList-item-text ShoppingList-item-text--clickable"
          onClick={onClick}
        >
          <div className="ShoppingList-item-name">{text}</div>
          {recipeInfo}
        </div>
      );
    }

    return (
      <div className="ShoppingList-item">
        <div className="ShoppingList-item-content ShoppingList-item-content--listItem">
          <Checkbox
            className="ShoppingList-item-checkbox"
            type="checkbox"
            checked={false}
            onChange={partial(onCheck, key)}
          />

          {content}
        </div>
        {actions}
      </div>
    );
  }
}

UncheckedItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.shape({
      text: PropTypes.string.isRequired,
      recipe: PropTypes.string,
    }).isRequired,
  }).isRequired,

  recipes: PropTypes.object,

  onCheck: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UncheckedItem;
