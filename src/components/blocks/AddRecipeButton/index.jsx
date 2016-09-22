
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';

import classnames from 'classnames';

import bind from 'lodash/bind';
import omit from 'lodash/omit';

import { on, off } from 'helpers/event';

import { VIEW_SOURCE } from 'constants/QueryParams';
import { RECIPES_NEW, RECIPES_IMPORT } from 'constants/Routes';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

import plusIcon from 'assets/images/icons/icon-mobile-rounded-add.svg';
import linkIcon from 'assets/images/icons/icon-link.svg';
import './styles.css';

class AddRecipeButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.onDocClick = bind(this.onDocClick, this);
    this.onClick = bind(this.onClick, this);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    on(document, 'click', this.onDocClick, true);
  }

  componentWillUnmount() {
    off(document, 'click', this.onDocClick, true);
  }

  onDocClick(event) {
    const node = findDOMNode(this);
    if (!node.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  onClick() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  renderMenu() {
    const className = classnames({
      'AddRecipeButton-menu': true,
      'AddRecipeButton-menu--right': this.props.rightAligned,
      'AddRecipeButton-menu--bottom': this.props.bottomAligned,
    });

    const { viewSource } = this.props;

    return (
      <ul className={className}>
        <li>
          <Link
            className="AddRecipeButton-menu-item"
            to={{
              pathname: RECIPES_NEW,
              query: { [VIEW_SOURCE]: viewSource },
            }}
          >
            <Icon className="AddRecipeButton-menu-item-icon" glyph={plusIcon} />
            <div className="AddRecipeButton-menu-item-text">Add your own recipe</div>
          </Link>
        </li>
        <li>
          <Link
            className="AddRecipeButton-menu-item"
            to={{
              pathname: RECIPES_IMPORT,
              query: { [VIEW_SOURCE]: viewSource },
            }}
          >
            <Icon className="AddRecipeButton-menu-item-icon" glyph={linkIcon} />
            <div className="AddRecipeButton-menu-item-text">Import recipe by URL</div>
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const options = omit(this.props, 'children');
    const { children, className } = this.props;
    const { isOpen } = this.state;

    const classNames = classnames('AddRecipeButton', className);

    return (
      <div className={classNames} ref="block">
        {isOpen && this.renderMenu()}
        <Button
          {...options}
          onClick={this.onClick}
        >
          {children || 'Add recipe'}
        </Button>
      </div>
    );
  }
}

AddRecipeButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  rightAligned: PropTypes.bool,
  bottomAligned: PropTypes.bool,
  viewSource: PropTypes.string,
};

export default AddRecipeButton;
